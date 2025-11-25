"use client";



import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductPage() {
  const { slug } = useParams();

  // ==============================
  // SWR PRIMERO — SIEMPRE
  // ==============================
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?where[slug][equals]=${slug}`,
    fetcher
  );

  // ==============================
  // ESTADOS QUE DEPENDEN DEL FETCH
  // (NO SE HACEN RETURNS ANTES)
  // ==============================
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);

  // ==============================
  // CUANDO LA DATA LLEGA, ARMAMOS LA GALERÍA
  // ==============================
  useEffect(() => {
    if (!data?.docs?.[0]) return;

    const product = data.docs[0];

    const imgs = (product.gallery || []).map((g: any) => {
      const url = g.image?.url || "";
      return url.startsWith("http")
        ? url
        : `${process.env.NEXT_PUBLIC_API_URL}${url}`;
    });

    setGallery(imgs);
    setSelectedImg(imgs[0] || null);
  }, [data]);

  // ==============================
  // MANEJO DE ESTADOS DE CARGA / ERROR
  // (YA DESPUÉS DE DEFINIR HOOKS)
  // ==============================
  if (error)
    return <p style={{ color: "white", padding: 40 }}>Error cargando…</p>;

  if (!data)
    return <p style={{ color: "white", padding: 40 }}>Cargando…</p>;

  const p = data.docs?.[0];

  if (!p)
    return <p style={{ color: "white", padding: 40 }}>Producto no encontrado.</p>;

  if (!selectedImg)
    return <p style={{ color: "white", padding: 40 }}>Cargando imágenes…</p>;

  // ==============================
  // SLIDER
  // ==============================
  const index = gallery.indexOf(selectedImg);

  const goNext = () => {
    if (index < gallery.length - 1) {
      setSelectedImg(gallery[index + 1]);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setSelectedImg(gallery[index - 1]);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "130px 30px",
          maxWidth: 900,
          margin: "0 auto",
          color: "white",
        }}
      >
        
        {/* ============================== */}
        {/* IMAGEN PRINCIPAL + ZOOM + FLECHAS */}
        {/* ============================== */}
        <div
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            borderRadius: 12,
            marginBottom: 25,
          }}

          
        >
          {index > 0 && (

            
            <button
              onClick={goPrev}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                padding: "10px 14px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 22,
                zIndex: 10,
              }}
            >
              ‹
            </button>
          )}
        
         <img
  src={selectedImg}
  alt={p.title}
  style={{
    width: "100%",
    height: "100%",          // 🔥 altura uniforme
    objectFit: "contain",       // 🔥 recorta para que encaje perfecta
    display: "block",
    borderRadius: 12,
    transition: "transform .3s ease",
  }}
  onMouseEnter={(e) => {
    if (window.innerWidth > 768) {
      e.currentTarget.style.transform = "scale(1.06)";
    }
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
/>


          {index < gallery.length - 1 && (
            <button
              onClick={goNext}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                padding: "10px 14px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 22,
                zIndex: 10,
              }}
            >
              ›
            </button>
          )}
        </div>

        {/* ============================== */}
        {/* MINIATURAS */}
        {/* ============================== */}
        {gallery.length > 1 && (
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 25,
              overflowX: "auto",
              paddingBottom: 10,
            }}
          >
            {gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImg(img)}
                style={{
                  width: 90,
                  height: 90,
                  objectFit: "cover",
                  borderRadius: 8,
                  cursor: "pointer",
                  border:
                    selectedImg === img
                      ? "2px solid #32cd32"
                      : "2px solid transparent",
                }}
              />
            ))}
          </div>
        )}

        {/* ============================== */}
        {/* INFO DEL PRODUCTO */}
        {/* ============================== */}
        <h1 style={{ fontSize: "2rem", marginBottom: 10 }}>{p.title}</h1>

        <p
          style={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            color: "#32cd32",
            marginBottom: 25,
          }}
        >
          ${p.priceInUSD}
        </p>

       {/* DESCRIPCIÓN */}
<h3 style={{ marginBottom: 10 }}>Descripción</h3>

<p style={{ opacity: 0.9 }}>
  {p.description?.root?.children
    ?.map((block: any) =>
      block.children?.map((child: any) => child.text).join(" ")
    )
    .join("\n") || "Sin descripción disponible."}
</p>

<a
  href={`https://wa.link/cd114w`}
  target="_blank"
  style={{
    display: "inline-block",
    background: "#ffffffff",
    color: "Black",
    padding: "12px 20px",
    borderRadius: 8,
    fontSize: "1.2rem",
    fontWeight: "bold",
    textDecoration: "none",
    marginTop: 20,
  }}
>
  Comprar
</a>

      </div>

      <Footer />
    </>
  );
}
