import { betterAuth } from "better-auth";
import { Kysely, PostgresDialect } from "kysely";
import pkg from "pg";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const { Pool } = pkg;

dotenv.config();

const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const db = new Kysely({
  dialect: new PostgresDialect({ pool: dbPool }),
});

const mailer = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const auth = betterAuth({
  database: {
    db: db,
    type: "postgres",
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await mailer.sendMail({
        from: '"Atlas" <no-reply@atlas.dev>',
        to: user.email,
        subject: "Vérifiez votre adresse email — Atlas",
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 32px;">
            <h2 style="color: #0D1B3E;">Bienvenue sur Atlas 👋</h2>
            <p style="color: #444;">Cliquez sur le bouton ci-dessous pour vérifier votre adresse email et accéder à votre compte.</p>
            <a href="${url}" style="display:inline-block; margin-top: 16px; padding: 12px 24px; background:#4F46E5; color:white; border-radius:8px; text-decoration:none; font-weight:bold;">
              Vérifier mon email
            </a>
            <p style="color:#999; font-size:12px; margin-top:32px;">
              Si vous n'avez pas créé de compte sur Atlas, ignorez cet email.
            </p>
          </div>
        `,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "CLIENT",
        input: true,
      },
      numero_telephone: {
        type: "string",
        required: false,
      },
      url_avatar: {
        type: "string",
        required: false,
      },
      emailVerified: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});