"use client";

const products = [
  {
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    nom: "Sac à Dos Urbain",
    note: 4,
    reviews: 89,
    boutique: "Boutique Élégance",
    prix: "79.99 €",
  },
  {
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
    nom: "Lampe de Bureau LED",
    note: 4,
    reviews: 134,
    boutique: "Maison & Déco",
    prix: "59.99 €",
  },
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    nom: "Montre Connectée Sport",
    note: 4,
    reviews: 113,
    boutique: "SportAttitude",
    prix: "199.99 €",
  },
];

export default function FeaturedProducts() {
  return (
    <section
      style={{
        background: "#f1f3f8",
        padding: "72px 80px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "36px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: "700",
                fontSize: "22px",
                color: "#111",
                marginBottom: "6px",
              }}
            >
              Produits en vedette
            </h2>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "13px",
                color: "#888",
              }}
            >
              Sélection de nos meilleures offres
            </p>
          </div>

          {/* Voir tout button */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              background: "white",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "13px",
              color: "#444",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#3b6bff";
              (e.currentTarget as HTMLButtonElement).style.color = "#3b6bff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#e0e0e0";
              (e.currentTarget as HTMLButtonElement).style.color = "#444";
            }}
          >
            Voir tout
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Product grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.nom}
              style={{
                background: "white",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  background: "#f3f4f6",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.nom}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "16px" }}>
                {/* Name */}
                <div
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#111",
                    marginBottom: "6px",
                  }}
                >
                  {product.nom}
                </div>

                {/* Stars + reviews */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ color: "#f59e0b", fontSize: "12px" }}>
                    {"★".repeat(product.note)}{"☆".repeat(5 - product.note)}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "11px",
                      color: "#aaa",
                    }}
                  >
                    ({product.reviews})
                  </span>
                </div>

                {/* Boutique */}
                <div
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "11px",
                    color: "#3b6bff",
                    marginBottom: "12px",
                  }}
                >
                  Vendu par {product.boutique}
                </div>

                {/* Price + cart */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "#111",
                    }}
                  >
                    {product.prix}
                  </span>
                  <button
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "#3b6bff",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#4f7cff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#3b6bff";
                    }}
                  >
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}