import { betterAuth } from "better-auth";
import { Kysely, PostgresDialect } from "kysely";
import pkg from "pg";
import { Resend } from "resend";
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

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: {
    db: db,
    type: "postgres",
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:3000"],
  // Forcer les cookies à accepter le cross-domain (Vercel <-> Render)
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      // Dépannage facile (sans attendre l'email), on affiche le lien dans les logs Render
      console.log("=========================================");
      console.log("🔗 LIEN DE VÉRIFICATION GÉNÉRÉ :");
      console.log(url);
      console.log("=========================================");

      try {
        const targetEmail = process.env.SANDBOX_EMAIL || user.email;
        
        const response = await resend.emails.send({
          from: "Atlas <onboarding@resend.dev>",
          to: targetEmail,
          subject: `Vérifiez votre adresse email (${user.email}) — Atlas`,
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

        if (response.error) {
          console.error("❌ Resend a refusé d'envoyer l'email :", response.error.message);
        } else {
          console.log("✅ Email de vérification envoyé avec succès à", user.email);
        }
      } catch (error) {
        console.error("❌ Erreur d'envoi d'email avec Resend:", error);
      }
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