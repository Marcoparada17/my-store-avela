"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [bg, setBg] = useState("/hero.png");      // imagen desktop
  const [heroHeight, setHeroHeight] = useState("50vh"); // altura desktop

  useEffect(() => {
    const updateHero = () => {
      if (window.innerWidth <= 768) {
        setBg("/fondomobile.jpg");
        setHeroHeight("100vh");   // altura mobile
      } else {
        setBg("/hero.png");
        setHeroHeight("50vh");    // altura desktop
      }
    };

    updateHero();
    window.addEventListener("resize", updateHero);
    return () => window.removeEventListener("resize", updateHero);
  }, []);

  return (
    <section
      style={{
        width: "100%",
        height: heroHeight,     // 👈 se ajusta dinámicamente
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: 10,
            fontWeight: "bold",
            lineHeight: 1.1,
          }}
        >
          Productos únicos, hechos para ti
        </h1>

        <p
          style={{
            fontSize: "1.3rem",
            opacity: 0.9,
            maxWidth: "500px",
          }}
        >
          Explora nuestra colección exclusiva y encuentra tu estilo.
        </p>

        <a
          href="/catalogo"
          style={{
            marginTop: 20,
            padding: "12px 25px",
            borderRadius: 6,
            background: "#ffffff",
            color: "#000",
            fontWeight: "bold",
            fontSize: 16,
            display: "inline-block",
            textDecoration: "none",
          }}
        >
          Ver catálogo
        </a>
      </div>
    </section>
  );
}
