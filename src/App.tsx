import { useState } from "react";
import ProductoForm from "./components/ProductoForm";
import ProductoLista from "./components/ProductoLista";
import type { Producto } from "./services/productoService";

export default function App() {
  const [recargar, setRecargar] = useState(0);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);

  const [aviso, setAviso] = useState("");

  const handleGuardado = (mensaje: string) => {
    setAviso(mensaje);
    setProductoSeleccionado(null);
    setRecargar((n) => n + 1);
  };

  const handleEditar = (producto: Producto) => {
    setAviso("");
    setProductoSeleccionado(producto);
  };

  const handleEliminado = (id: string) => {
    if (productoSeleccionado?.id === id) {
      setProductoSeleccionado(null);
    }
    setAviso("Producto eliminado correctamente");
  };

  return (
    <div className="app">
      {aviso && <p className="aviso">{aviso}</p>}
      <ProductoForm
        key={productoSeleccionado?.id ?? "nuevo"}
        productoSeleccionado={productoSeleccionado}
        onGuardado={handleGuardado}
        onCancelar={() => {
          setAviso("");
          setProductoSeleccionado(null);
        }}
      />
      <ProductoLista
        recargar={recargar}
        onEditar={handleEditar}
        onEliminado={handleEliminado}
      />
    </div>
  );
}
