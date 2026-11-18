import { useState } from "react";
import ProductoForm from "./components/ProductoForm";
import ProductoLista from "./components/ProductoLista";

export default function App() {
  const [recargar, setRecargar] = useState(0);

  return (
    <div className="app">
      <ProductoForm onGuardado={() => setRecargar((n) => n + 1)} />
      <ProductoLista recargar={recargar} />
    </div>
  );
}
