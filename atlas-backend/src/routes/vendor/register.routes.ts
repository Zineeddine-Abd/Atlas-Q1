import express from "express";
import { auth } from "../../auth.js";
import { pool } from "../../db/index.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, name, shopName, shopDescription, callbackURL } = req.body;
  let createdUserId = null;

  try {
    const authResponse = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        role: "VENDEUR",
        callbackURL: callbackURL || undefined,
        // email_verifie: true, // on veut pas que l'email soit deja verifier
      },
    });

    createdUserId = authResponse.user.id;

    await pool.query(
      `INSERT INTO boutiques (proprietaire_id, nom, description, statut) 
       VALUES ($1, $2, $3, $4)`,
      [createdUserId, shopName, shopDescription, "EN_ATTENTE"]
    );

    return res.status(201).json({
      message: "Compte vendeur et boutique créés avec succès.",
      user: authResponse.user,
    });
  } catch (error: any) {
    console.error("Erreur inscription vendeur:", error);

    // If the boutique insert failed but the user was already created, roll back
    if (createdUserId) {
      try {
        await pool.query('DELETE FROM "user" WHERE id = $1', [createdUserId]);
      } catch (cleanupError) {
        console.error("Impossible de supprimer l'utilisateur orphelin:", cleanupError);
      }
    }

    const isEmailTaken = error.message?.toLowerCase().includes("email");
    return res.status(isEmailTaken ? 409 : 500).json({
      message: isEmailTaken
        ? "Cette adresse email est déjà utilisée."
        : error.message || "Une erreur est survenue lors de la création de la boutique.",
    });
  }
});

export default router;