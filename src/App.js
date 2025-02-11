import React from "react";
import AppRoutes from "./routes";

const layoutStyle = {
  justifyContent: "center", // Centraliza horizontalmente
  alignItems: "center", // Centraliza verticalmente
  width: "100vw", // Ocupa 100% da largura da tela
  height: "100vh", // Ocupa 100% da altura da tela
  margin: 0, // Remove qualquer margem extra
  padding: 0, // Remove qualquer padding extra
  boxSizing: "border-box", // Garante que padding/margins não afetem o tamanho
};


function App() {
  return (
    <div style={layoutStyle}>
      <AppRoutes />
    </div>
  );
}

export default App;
