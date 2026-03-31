import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import expressJSDocSwagger from "express-jsdoc-swagger";
import authRouter from "./routes/auth.routes.js";
import { auth } from "./auth.js";
import { fromNodeHeaders } from "better-auth/node";
import vendorRouter from "./routes/vendor/register.routes.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3005;

const swaggerOptions = {
  info: {
    version: '1.0.0',
    title: 'Atlas API',
    description: 'Documentation interactive de l\'API Atlas',
  },
  baseDir: __dirname,
  filesPattern: './**/*.{ts,js}',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
};
// @ts-ignore
expressJSDocSwagger(app)(swaggerOptions);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

// Branchement de Better-Auth
app.use("/api/auth", authRouter);
// Branchement des routes vendeur
app.use("/api/vendor", vendorRouter);

// Route pour récupérer la session de l'utilisateur connecté
app.get("/api/me", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.status(401).json({ error: "Non authentifié" });
      return;
    }

    res.json({
      user: session.user,
      session: session.session,
    });
  } catch (error) {
    console.error("Erreur /api/me :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(port, () => {
  console.log(`Atlas Backend démarré sur http://localhost:${port}`);
  console.log(`Auth API disponible sur http://localhost:${port}/api/auth`);
});

export default app;
