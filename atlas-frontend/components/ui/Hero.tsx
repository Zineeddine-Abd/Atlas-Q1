"use client";

import { useState } from "react";
import Link from "next/link";
import Productcard from "@/components/ui/Productcard";

const tags = [
  { icon: "✦", label: "1000+ produits" },
  { icon: "✦", label: "50+ vendeurs" },
  { icon: "✦", label: "Livraison rapide" },
];

const categoryTabs = ["Tout", "Mode", "Maison", "Tech"];

const products = [
  {
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&q=80",
    nom: "Sac en cuir artisanal",
    prix: 89.99,
    boutique: "la BoutiqueNoire",
    note: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&q=80",
    nom: "Lampe design scandinave",
    prix: 149.99,
    boutique: "la BoutiqueNoire",
    note: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&q=80",
    nom: "Veste denim premium",
    prix: 67.00,
    boutique: "la BoutiqueNoire",
    note: 3,
  },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("Tout");
  const [query, setQuery] = useState("");

  return (
    <section
      style={{
        minHeight: "100vh",
        paddingTop: "60px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="hero-glow" style={{ left: "-100px", top: "100px" }} />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(120,60,255,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          right: "10%",
          bottom: "20%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
          gap: "40px",
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Left */}
        <div style={{ flex: 1, maxWidth: "600px" }}>

          <h1
            className="animate-fade-up"
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "52px",
              fontWeight: "800",
              lineHeight: 1.15,
              marginBottom: "20px",
              opacity: 0,
              animationDelay: "0s",
              animationFillMode: "forwards",
              color: "white",
            }}
          >
            Le marché des{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #3b6bff, #7b9fff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              vendeurs indépendants
            </span>
          </h1>

          <p
            className="animate-fade-up"
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "rgba(255,255,255,0.75)",
              fontSize: "18px",
              marginBottom: "36px",
              opacity: 0,
              animationDelay: "0.1s",
              animationFillMode: "forwards",
            }}
          >
            Des milliers de vendeurs passionnés. Des produits uniques.
          </p>

          {/* Search bar */}
          <div
            className="animate-fade-up"
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "24px",
              opacity: 0,
              animationDelay: "0.2s",
              animationFillMode: "forwards",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(255,255,255,0.08)",
                border: "1.5px solid rgba(255,255,255,0.2)",
                borderRadius: "14px",
                padding: "0 20px",
              }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.5)" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="m21 21-4.35-4.35" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un produit, un vendeur..."
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "DM Sans, sans-serif",
                  padding: "18px 0",
                }}
              />
            </div>
            <button
              className="btn-primary"
              style={{
                padding: "18px 28px",
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: "600",
                whiteSpace: "nowrap",
              }}
            >
              Rechercher
            </button>
          </div>

          {/* Tags */}
          <div
            className="animate-fade-up"
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "28px",
              opacity: 0,
              animationDelay: "0.3s",
              animationFillMode: "forwards",
            }}
          >
            {tags.map((t) => (
              <span key={t.label} className="tag-pill" style={{ fontSize: "13px", padding: "7px 16px" }}>
                <span style={{ color: "#3b6bff" }}>{t.icon}</span>
                {t.label}
              </span>
            ))}
          </div>

          {/* Category tabs */}
          <div
            className="animate-fade-up"
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "36px",
              opacity: 0,
              animationDelay: "0.35s",
              animationFillMode: "forwards",
            }}
          >
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`category-tab ${activeTab === tab ? "active" : "inactive"}`}
                style={{ fontSize: "14px", padding: "8px 20px" }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* CTA buttons */}
          <div
            className="animate-fade-up"
            style={{
              display: "flex",
              gap: "14px",
              opacity: 0,
              animationDelay: "0.4s",
              animationFillMode: "forwards",
            }}
          >
            <Link href="/register">
              <button
                className="btn-primary"
                style={{
                  padding: "16px 28px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                Inscription
              </button>
            </Link>
            <Link href="/login">
              <button
                className="btn-outline"
                style={{
                  padding: "16px 28px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Connexion
              </button>
            </Link>
          </div>
        </div>

        {/* Right — floating cards */}
        <div
          style={{
            flex: 1,
            position: "relative",
            height: "500px",
            minWidth: "420px",
          }}
        >
          <div className="animate-float" style={{ position: "absolute", left: "0px", top: "30px", zIndex: 2 }}>
            <Productcard {...products[0]} />
          </div>
          <div className="animate-float-delay" style={{ position: "absolute", right: "0px", top: "0px", zIndex: 1 }}>
            <Productcard {...products[1]} />
          </div>
          <div className="animate-float" style={{ position: "absolute", left: "110px", bottom: "20px", animationDelay: "0.8s", zIndex: 3 }}>
            <Productcard {...products[2]} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ padding: "0 80px 20px", maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
        <div className="divider" />
        <div
          style={{
            textAlign: "center",
            marginTop: "12px",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Produits Populaires
        </div>
      </div>
    </section>
  );
}