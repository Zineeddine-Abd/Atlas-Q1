/**
 * @file auth.ts
 * @description Configuration de BetterAuth pour Atlas.
 *
 * Authentification par email/mot de passe avec session httpOnly cookie.
 * Champs utilisateur étendus : `role` (CLIENT | VENDEUR), `numero_telephone`, `url_avatar`.
 *
 * Variables d'environnement requises :
 * - `DATABASE_URL`        : connexion PostgreSQL (pool Kysely)
 * - `BETTER_AUTH_SECRET`  : clé secrète pour signer les sessions
 * - `BETTER_AUTH_URL`     : URL de base du backend (ex: http://localhost:3005)
 * - `FRONTEND_URL`        : URL du frontend pour CORS/trustedOrigins
 * - `NODE_ENV`            : "production" active les cookies Secure + SameSite=None
 *
 * Durée de session : 7 jours, renouvelée automatiquement après 24 h d'inactivité.
 */
import { betterAuth } from "better-auth";
import { Kysely, PostgresDialect } from "kysely";
import pkg from "pg";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const db = new Kysely({
  dialect: new PostgresDialect({ pool: dbPool }),
});

const isProd = process.env.NODE_ENV === "production";

/**
 * Instance BetterAuth exportée et consommée par `authMiddleware`
 * et montée sur `/api/auth` dans `app.ts`.
 */
export const auth = betterAuth({
  database: {
    db: db,
    type: "postgres",
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:3000"],
  advanced: {
    defaultCookieAttributes: {
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      httpOnly: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await transporter.sendMail({
        from: `"Atlas" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: "Vérifiez votre adresse email — Atlas",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:16px;border:1px solid #e5e7eb;">
            <h2 style="color:#0D1B3E;margin-bottom:8px;">Bienvenue sur Atlas !</h2>
            <p style="color:#4b5563;margin-bottom:24px;">Bonjour <strong>${user.name}</strong>,<br>Cliquez sur le bouton ci-dessous pour activer votre compte.</p>
            <a href="${url}" style="display:inline-block;background:#4F46E5;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:15px;">
              Vérifier mon adresse email
            </a>
            <p style="color:#9ca3af;font-size:12px;margin-top:28px;">Ce lien expire dans 24h. Si vous n'avez pas créé de compte Atlas, ignorez cet email.</p>
          </div>
        `,
      });
    },
  },
  user: {
    additionalFields: {
      /** Rôle de l'utilisateur : "CLIENT" (défaut) ou "VENDEUR" */
      role: {
        type: "string",
        required: false,
        defaultValue: "CLIENT",
        input: true,
      },
      /** Numéro de téléphone optionnel */
      numero_telephone: {
        type: "string",
        required: false,
      },
      /** URL de l'avatar optionnel */
      url_avatar: {
        type: "string",
        required: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});
