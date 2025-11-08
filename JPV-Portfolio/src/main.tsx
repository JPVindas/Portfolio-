// JPV-Portfolio/src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/tailwind.css"; // hoja principal de Tailwind (si existe)
import "./index.css";           // estilos globales

import App from "./App";
import { LanguageProvider } from "./locale/LanguageProvider";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("No se encontró el elemento #root en index.html");
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
