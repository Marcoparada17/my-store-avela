"use client";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 80,
        padding: "60px 25px",
        background: "#000",
        color: "#fff",
        textAlign: "center",
        borderTop: "1px solid #1a1a1a",
      }}
    >
      {/* LOGO BCV */}
      <div style={{ marginBottom: 25 }}>
        <img
          src="/logobcv.svg" // Asegúrate de tenerlo en /public
          alt="BCV"
          style={{
            width: 85,
            opacity: 0.85,
            filter: "drop-shadow(0 0 4px rgba(255,255,255,0.1))",
          }}
        />
      </div>

      {/* TEXTO DE LA TASA (ESTÁTICO o manual) */}
      <p
        style={{
          fontSize: "1.4rem",
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
       
      
      </p>

      {/* BOTÓN WHATSAPP */}
      <a
        href="https://wa.link/cd114w"
        target="_blank"
        style={{
          display: "inline-block",
          background: "#32cd32",
          color: "#000",
          padding: "14px 26px",
          borderRadius: 10,
          fontSize: "1.1rem",
          fontWeight: "bold",
          textDecoration: "none",
          marginTop: 10,
          boxShadow: "0 0 12px rgba(50,205,50,0.3)",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Comprar ahora
      </a>

      {/* DIVISOR */}
      <div
        style={{
          width: "70%",
          height: 1,
          background: "#222",
          margin: "35px auto",
        }}
      />

      {/* INFORMACIÓN */}
      <p style={{ fontSize: "0.9rem", opacity: 0.75 }}>
        © {new Date().getFullYear()} Avela Store — Todos los derechos reservados.
      </p>

      <p style={{ fontSize: "0.9rem", opacity: 0.75, marginTop: 5 }}>
        Tienda exclusiva de trajes de baño en Venezuela — Envíos a todo el país.
      </p>

      <p style={{ fontSize: "0.9rem", opacity: 0.75, marginTop: 5 }}>
       
       
      </p>
    </footer>
  );
}
