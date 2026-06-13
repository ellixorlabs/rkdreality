import React from "react";
import { Atmosphere } from "./components/Atmosphere.jsx";
import { ConstructionHero } from "./components/ConstructionHero.jsx";

export default function App() {
  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-ivory text-ink antialiased">
      <Atmosphere />
      <ConstructionHero />
    </main>
  );
}
