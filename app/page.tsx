"use client";

import useSWR from "swr";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard"; // usar tu card estilizada

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?sort=-createdAt`,
    fetcher
  );

  const productos = data?.docs || [];

  return (
    <>
      <Navbar />
      <Hero />

      <main style={{ padding: "40px 60px" }}>
        <h2 style={{ fontSize: 28, marginBottom: 20 }}>Catálogo destacado</h2>

        <div style={{ marginBottom: 30 }}>
          <a
            href="/catalogo"
            style={{
              background: "white",
              color: "black",
              padding: "10px 18px",
              borderRadius: 6,
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Ver catálogo completo →
          </a>
        </div>

        {error && <p>Error cargando productos…</p>}
        {!data && <p>Cargando productos…</p>}

        {/* 🔥 SOLO 3 PRODUCTOS SIEMPRE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 30,
          }}
        >
          {productos.slice(0, 4).map((p: any) => {
            const url = p.gallery?.[0]?.image?.url;
            const img = url?.startsWith("http")
              ? url
              : `${process.env.NEXT_PUBLIC_API_URL}${url}`;

            return (
              <ProductCard
                key={p.id}
                title={p.title}
                price={p.priceInUSD}
                image={img}
                slug={p.slug}
              />
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}
