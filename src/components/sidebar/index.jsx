import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{ width: "200px", background: "#f1f1f1", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Link to="/perfil" style={{ margin: "10px" }}>Perfil</Link>
      <Link to="/projetos" style={{ margin: "10px" }}>Projetos</Link>
    </div>
  );
}

export default Sidebar;