"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBasket, PawPrint, Palette, Car, Sparkles, Baby,
  Gem, Footprints, Cpu, Monitor, Shovel, Gamepad2,
  BookOpen, Home, Shirt, Music, HeartPulse, Globe,
  Smartphone, Luggage, Zap,
} from "lucide-react";

/**
 * Section "Explorez par catégorie" de la page d'accueil.
 *
 * Charge les catégories depuis l'API et les affiche sous forme de tuiles colorées
 * avec icône et nombre de produits. Un clic sur une tuile redirige vers le catalogue
 * filtré par cette catégorie.
 *
 * Chaque catégorie a un style visuel prédéfini (icône + dégradé) ; les catégories
 * inconnues utilisent un style par défaut.
 *
 * @returns La grille de catégories, ou `null` pendant le chargement.
 */

const CATEGORY_STYLES: Record<string, { icon: React.ReactNode; gradient: string }> = {
  "Alimentation & Épicerie":      { icon: <ShoppingBasket size={24} color="white" strokeWidth={1.8} />, gradient: "from-[#22c55e] to-[#0ea5e9]" },
  "Animaux":                       { icon: <PawPrint size={24} color="white" strokeWidth={1.8} />,       gradient: "from-[#f59e0b] to-[#ef4444]" },
  "Art & Artisanat":               { icon: <Palette size={24} color="white" strokeWidth={1.8} />,        gradient: "from-[#ec4899] to-[#f97316]" },
  "Auto & Moto":                   { icon: <Car size={24} color="white" strokeWidth={1.8} />,            gradient: "from-[#64748b] to-[#3b6bff]" },
  "Beauté & Bien-être":            { icon: <Sparkles size={24} color="white" strokeWidth={1.8} />,       gradient: "from-[#f472b6] to-[#7b4fff]" },
  "Bébé & Puériculture":           { icon: <Baby size={24} color="white" strokeWidth={1.8} />,           gradient: "from-[#fbbf24] to-[#f472b6]" },
  "Bijoux & Accessoires":          { icon: <Gem size={24} color="white" strokeWidth={1.8} />,            gradient: "from-[#a78bfa] to-[#ec4899]" },
  "Chaussures":                    { icon: <Footprints size={24} color="white" strokeWidth={1.8} />,     gradient: "from-[#f97316] to-[#ef4444]" },
  "Électronique & High-Tech":      { icon: <Cpu size={24} color="white" strokeWidth={1.8} />,            gradient: "from-[#3b6bff] to-[#7b4fff]" },
  "Informatique & Bureautique":    { icon: <Monitor size={24} color="white" strokeWidth={1.8} />,        gradient: "from-[#0ea5e9] to-[#3b6bff]" },
  "Jardin & Bricolage":            { icon: <Shovel size={24} color="white" strokeWidth={1.8} />,         gradient: "from-[#16a34a] to-[#65a30d]" },
  "Jeux & Jouets":                 { icon: <Gamepad2 size={24} color="white" strokeWidth={1.8} />,       gradient: "from-[#7b4fff] to-[#3b6bff]" },
  "Livres & Papeterie":            { icon: <BookOpen size={24} color="white" strokeWidth={1.8} />,       gradient: "from-[#0891b2] to-[#0ea5e9]" },
  "Maison & Décoration":           { icon: <Home size={24} color="white" strokeWidth={1.8} />,           gradient: "from-[#0ea5e9] to-[#3b6bff]" },
  "Mode & Vêtements":              { icon: <Shirt size={24} color="white" strokeWidth={1.8} />,          gradient: "from-[#7b4fff] to-[#c026d3]" },
  "Musique & Instruments":         { icon: <Music size={24} color="white" strokeWidth={1.8} />,          gradient: "from-[#f43f5e] to-[#7b4fff]" },
  "Santé & Pharmacie":             { icon: <HeartPulse size={24} color="white" strokeWidth={1.8} />,     gradient: "from-[#ef4444] to-[#f97316]" },
  "Sport & Loisirs":               { icon: <Globe size={24} color="white" strokeWidth={1.8} />,          gradient: "from-[#3b6bff] to-[#0ea5e9]" },
  "Téléphones & Accessoires":      { icon: <Smartphone size={24} color="white" strokeWidth={1.8} />,     gradient: "from-[#6366f1] to-[#3b6bff]" },
  "Voyage & Bagages":              { icon: <Luggage size={24} color="white" strokeWidth={1.8} />,        gradient: "from-[#0ea5e9] to-[#22c55e]" },
  "default":                       { icon: <Zap size={24} color="white" strokeWidth={1.8} />,            gradient: "from-[#3b6bff] to-[#7b4fff]" },
};

interface CategoryFromDB {
  id: number;
  nom: string;
  count: number;
}

export default function Categories() {
  const [categories, setCategories] = useState<CategoryFromDB[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (cat: CategoryFromDB) => {
    router.push(`/catalogue?categorie=${encodeURIComponent(cat.nom)}`);
  };

  if (loading) return null;

  return (
    <section className="bg-gray-50 py-12 md:py-20 px-4 md:px-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-7 rounded-sm bg-gradient-to-b from-[#3b6bff] to-[#7b4fff]" />
          <h2 className="font-bold text-2xl text-[#111]">Explorez par catégorie</h2>
        </div>
        <div className="flex overflow-x-auto pb-4 sm:pb-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 no-scrollbar">
          {categories.map((cat) => {
            const style = CATEGORY_STYLES[cat.nom] || CATEGORY_STYLES["default"];
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`flex-none w-[140px] md:w-full rounded-2xl bg-gradient-to-br ${style.gradient} p-6 flex flex-col items-center gap-3 transition-all shadow-md hover:-translate-y-1 hover:shadow-xl active:scale-95 cursor-pointer`}
              >
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                  {style.icon}
                </div>
                <div className="text-center">
                  <div className="font-bold text-[13px] text-white leading-tight">
                    {cat.nom}
                  </div>
                  <div className="text-[11px] text-white/75">
                    {cat.count} produits
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
