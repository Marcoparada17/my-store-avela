"use client";

import Link from "next/link";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  slug: string;
}

export default function ProductCard({ title, price, image, slug }: ProductCardProps) {
  return (
    <Link href={`/product/${slug}`} style={{ textDecoration: "none" }}>
      <div
        className="product-card"
        style={{
          background: "#111",
          borderRadius: 10,
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform .2s ease",
        }}
        onMouseEnter={(e) => {
          const card = e.currentTarget;
          const img = card.querySelector("img") as HTMLImageElement;
          card.style.transform = "translateY(-4px)";
          img.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          const img = card.querySelector("img") as HTMLImageElement;
          card.style.transform = "translateY(0px)";
          img.style.transform = "scale(1)";
        }}
      >
        <div style={{ width: "100%", height: 280, overflow: "hidden" }}>
          <img
            src={image}
            alt={title}
            className="product-img"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform .3s ease",
            }}
          />
        </div>

        <div style={{ padding: "12px 14px" }}>
          <h3
            style={{
              fontSize: "1rem",
              color: "white",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: 8,
            }}
          >
            {title}
          </h3>

          <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#32cd32" }}>
            ${price}
          </p>
        </div>
      </div>
    </Link>
  );
}
