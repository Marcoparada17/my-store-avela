"use client";

import { useState } from "react";
import useSWR from "swr";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Catalogo() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
    fetcher
  );

  const productos: any[] = data?.docs || [];

  // ============================
  //   FILTRO POR TALLA (CATEGORÍAS)
  // ============================
  const [filtroTalla, setFiltroTalla] = useState<string>("Todas");

  // sacar todas las tallas únicas desde categories.title
  const tallasUnicas: string[] = Array.from(
    new Set(
      productos.flatMap((p: any) =>
        (p.categories || []).map((c: any) => c.title as string)
      )
    )
  );

  // productos filtrados según talla seleccionada
  const productosFiltrados =
    filtroTalla === "Todas"
      ? productos
      : productos.filter((p: any) =>
          (p.categories || []).some((c: any) => c.title === filtroTalla)
        );

  return (
    <>
      <Navbar />

      <div style={{ padding: "120px 40px", color: "white" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 20 }}>Catálogo Completo</h1>

        {/* ERRORES / LOADING */}
        {error && <p>Error cargando productos…</p>}
        {!data && !error && <p>Cargando productos…</p>}

        {/* ============================
            BOTONES DE TALLAS
        ============================ */}
        <div style={{ marginBottom: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            key="Todas"
            onClick={() => setFiltroTalla("Todas")}
            style={{
              padding: "8px 16px",
              background: filtroTalla === "Todas" ? "#32cd32" : "#222",
              color: "white",
              border: "1px solid #444",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Todas
          </button>

          {tallasUnicas.map((talla) => (
            <button
              key={talla}
              onClick={() => setFiltroTalla(talla)}
              style={{
                padding: "8px 16px",
                background: filtroTalla === talla ? "#32cd32" : "#222",
                color: "white",
                border: "1px solid #444",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {talla}
            </button>
          ))}
        </div>

        {/* ============================
            GRID DE PRODUCTOS
        ============================ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 25,
          }}
        >
          {productosFiltrados.map((p: any) => {
            const first = p.gallery?.[0]?.image?.url || "";
            const img = first.startsWith("http")
              ? first
              : `${process.env.NEXT_PUBLIC_API_URL}${first}`;

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
      </div>

      <Footer />
    </>
  );
}
