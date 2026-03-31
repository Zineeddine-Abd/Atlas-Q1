"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";

const passwordSchema = z.string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
  .regex(/[a-z]/, "Le mot de passe doit contenir au moins une lettre minuscule.")
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule.")
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre.")
  .regex(/[^a-zA-Z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial.");

const registerSchema = z.object({
  firstName: z.string().min(1, "Veuillez remplir votre prénom.").trim(),
  lastName: z.string().min(1, "Veuillez remplir votre nom.").trim(),
  email: z.string().trim().toLowerCase().email("Veuillez entrer une adresse email valide."),
  password: passwordSchema,
  confirmPassword: z.string(),
  userType: z.enum(["buyer", "seller"]),
  shopName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Les mots de passe ne correspondent pas.",
      path: ["confirmPassword"]
    });
  }
  if (data.userType === "seller" && (!data.shopName || data.shopName.trim() === "")) {
    ctx.addIssue({
      code: "custom",
      message: "Veuillez fournir un nom de boutique pour un compte professionnel.",
      path: ["shopName"]
    });
  }
});

export default function RegistrationPage() {
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validation = registerSchema.safeParse({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email,
      password,
      confirmPassword,
      userType,
      shopName: shopName.trim(),
    });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;

      if (userType === "seller") {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

        const response = await fetch(`${backendUrl}/api/vendor/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            name: fullName,
            shopName: shopName.trim(),
            shopDescription: shopDescription.trim(),
            callbackURL: `${window.location.origin}/email-verified`,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur lors de la création de la boutique");
        }
      } else {
        const result = await signUp.email({
          email,
          password,
          name: fullName,
          callbackURL: `${window.location.origin}/email-verified`,
        });

        if (result.error) {
          throw new Error(result.error.message || "Erreur lors de l'inscription");
        }
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all text-zinc-800";
  const labelClass = "text-sm font-semibold text-zinc-900";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 py-12 px-4 relative overflow-hidden font-sans w-full">
      <main className="w-full max-w-[600px] z-10 my-8">
        <div className="bg-white rounded-2xl w-full px-10 py-9 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 animate-slideUp">

          <div className="flex flex-col items-center">
            <div className="flex bg-zinc-100 rounded-full p-1 w-fit mb-7" role="tablist">
              {(["buyer", "seller"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  role="tab"
                  aria-selected={userType === r}
                  onClick={() => { setUserType(r); setError(""); }}
                  className={`px-9 py-2.5 rounded-full text-[15px] font-semibold transition-all duration-200 cursor-pointer
                    ${userType === r
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-transparent text-zinc-500 hover:text-zinc-800"
                    }`}
                >
                  {r === "buyer" ? "Particulier" : "Professionnel"}
                </button>
              ))}
            </div>

            <h1 className="text-[30px] font-extrabold text-zinc-900 mb-1.5 tracking-tight text-center">
              Créer un compte
            </h1>
            <p className="text-sm text-zinc-500 mb-7 text-center">
              Rejoignez Atlas et découvrez notre marketplace
            </p>
          </div>

          {isSuccess ? (
            <div className="flex flex-col items-center bg-emerald-50 border border-emerald-100 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-5 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-emerald-800 mb-2">Inscription réussie !</h2>
              <p className="text-sm text-emerald-700 mx-auto max-w-sm mb-6 leading-relaxed">
                Un email de vérification a été envoyé à <strong className="font-semibold">{email}</strong>. 
                Veuillez cliquer sur le lien qu'il contient pour activer votre compte.
              </p>
              <Link
                href="/login"
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all text-[15px] shadow-sm shadow-indigo-500/20"
              >
                Aller à la page de connexion
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 rounded-xl px-3.5 py-3 text-[13.5px] font-medium mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleRegistration} className="flex flex-col gap-5" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Prénom</label>
                    <input
                      type="text"
                      placeholder="Jean"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Nom</label>
                    <input
                      type="text"
                      placeholder="Dupont"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Adresse email</label>
                  <input
                    type="email"
                    placeholder="jean.dupont@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Mot de passe</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${inputClass} pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <ul className="text-[12.5px] text-zinc-500 mt-1.5 space-y-1 pl-1">
                      <li>• Au moins 8 caractères</li>
                      <li>• 1 majuscule et 1 minuscule</li>
                      <li>• 1 chiffre et 1 caractère spécial</li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Confirmation</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`${inputClass} pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {userType === "seller" && (
                  <div className="border-t border-zinc-100 pt-6 mt-2 space-y-5">
                    <h3 className="text-base font-semibold text-gray-900">
                      Informations de la boutique
                    </h3>
                    <div className="flex flex-col gap-2">
                      <label className={labelClass}>Nom de la boutique</label>
                      <input
                        type="text"
                        placeholder="Ex: Tech Paradise"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelClass}>Description courte</label>
                      <textarea
                        placeholder="Décrivez votre boutique en quelques mots..."
                        value={shopDescription}
                        onChange={(e) => setShopDescription(e.target.value)}
                        className={`${inputClass} min-h-[100px] resize-y`}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !email ||
                    !password ||
                    !firstName ||
                    !lastName ||
                    (userType === "seller" && !shopName.trim())
                  }
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 mt-4 shadow-sm shadow-indigo-500/20"
                >
                  {loading
                    ? "Création en cours..."
                    : userType === "seller"
                    ? "Créer ma boutique"
                    : "Créer mon compte"}
                </button>
              </form>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-zinc-100">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-zinc-100" />
              </div>
              <span className="relative bg-white px-3 text-sm text-zinc-400 font-medium">ou</span>
            </div>
            <p className="text-zinc-500 text-sm text-center">
              Vous avez déjà un compte ?{" "}
              <Link href="/login" className="text-indigo-600 font-bold hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}