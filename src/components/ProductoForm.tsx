import { useState } from "react";
import type { FormEvent } from "react";
import { crearProducto } from "../services/productoService";

interface Props {
  onGuardado: () => void;
}

export default function ProductoForm({ onGuardado }: Props) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje("");

    try {
      await crearProducto(nombre, Number(precio), Number(stock));
      setNombre("");
      setPrecio("");
      setStock("");
      setMensaje("Producto guardado correctamente");
      onGuardado();
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo guardar el producto");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Registrar producto</h1>

      <label>
        Nombre
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </label>

      <label>
        Precio
        <input
          type="number"
          step="0.01"
          min="0"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
      </label>

      <label>
        Stock
        <input
          type="number"
          min="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={guardando}>
        {guardando ? "Guardando..." : "Guardar producto"}
      </button>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  );
}
