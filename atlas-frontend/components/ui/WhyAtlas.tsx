"use client";

const reasons = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#3b6bff" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Multi-vendeurs",
    description: "Accédez à des milliers de vendeurs indépendants qui proposent des produits uniques et variés.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#3b6bff" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Paiement sécurisé",
    description: "Vos transactions sont protégées et sécurisées grâce à notre système de paiement avancé.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#3b6bff" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Livraison rapide",
    description: "Bénéficiez d'une livraison rapide et suivez vos commandes en temps réel.",
  },
];

export default function WhyAtlas() {
  return (
    <section
      style={{
        background: "white",
        padding: "80px 80px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: "700",
              fontSize: "26px",
              color: "#111",
              marginBottom: "10px",
            }}
          >
            Pourquoi Atlas ?
          </h2>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              color: "#888",
            }}
          >
            Une marketplace qui fait la différence
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {reasons.map((reason) => (
            <div
              key={reason.title}
              style={{
                border: "1px solid #e8eaf0",
                borderRadius: "16px",
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "16px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(59,107,255,0.1)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "#3b6bff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.borderColor = "#e8eaf0";
              }}
            >
              {/* Icon container */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  background: "rgba(59,107,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {reason.icon}
              </div>

              {/* Title */}
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: "700",
                  fontSize: "16px",
                  color: "#111",
                }}
              >
                {reason.title}
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "13px",
                  color: "#777",
                  lineHeight: "1.7",
                }}
              >
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}