import React, { useState } from "react";
import InternNow from "./InternNow.jsx";
import BunkBros from "./BunkBros.jsx";

export default function App() {
  const [which, setWhich] = useState("internnow");

  return (
    <div>
      <div style={{
        display: "flex", justifyContent: "center", gap: 10,
        padding: "16px 0", fontFamily: "sans-serif"
      }}>
        <button
          onClick={() => setWhich("internnow")}
          style={{
            padding: "8px 16px", borderRadius: 999, cursor: "pointer",
            border: "2px solid #16192B",
            background: which === "internnow" ? "#16192B" : "#fff",
            color: which === "internnow" ? "#fff" : "#16192B",
            fontWeight: 700
          }}
        >
          InternNow
        </button>
        <button
          onClick={() => setWhich("bunkbros")}
          style={{
            padding: "8px 16px", borderRadius: 999, cursor: "pointer",
            border: "2px solid #161616",
            background: which === "bunkbros" ? "#E63946" : "#fff",
            color: which === "bunkbros" ? "#fff" : "#161616",
            fontWeight: 700
          }}
        >
          BunkBROS
        </button>
      </div>
      {which === "internnow" ? <InternNow /> : <BunkBros />}
    </div>
  );
}
