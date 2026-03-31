/**
 * @file auth-client.ts
 * @description Initialisation et export du client BetterAuth côté navigateur.
 */
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3001",
  fetchOptions: {
    credentials: "include", // pour que les cookies peuvent passer 
  }
});

export const { signIn, signUp, signOut, useSession } = authClient;
