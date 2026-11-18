import { useState } from "react";
import type { FormEvent } from "react";
import { actualizarProducto, crearProducto } from "../services/productoService";
import type { Producto } from "../services/productoService";

interface Props {
  productoSeleccionado: Producto | null;
  onGuardado: (mensaje: string) => void;
  onCancelar: () => void;
}

export default function ProductoForm({
  productoSeleccionado,
  onGuardado,
  onCancelar,
}: Props) {
  const [nombre, setNombre] = useState(productoSeleccionado?.nombre ?? "");
  const [precio, setPrecio] = useState(
    productoSeleccionado ? String(productoSeleccionado.precio) : ""
  );
  const [stock, setStock] = useState(
    productoSeleccionado ? String(productoSeleccionado.stock) : ""
  );
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  const limpiar = () => {
    setNombre("");
    setPrecio("");
    setStock("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje("");

    try {
      if (productoSeleccionado) {
        await actualizarProducto(
          productoSeleccionado.id,
          nombre,
          Number(precio),
          Number(stock)
        );
        limpiar();
        onGuardado("Producto actualizado correctamente");
      } else {
        await crearProducto(nombre, Number(precio), Number(stock));
        limpiar();
        onGuardado("Producto guardado correctamente");
      }
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo guardar el producto");
    } finally {
      setGuardando(false);
    }
  };

  const handleCancelar = () => {
    limpiar();
    setMensaje("");
    onCancelar();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>{productoSeleccionado ? "Editar producto" : "Registrar producto"}</h1>

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
        {guardando
          ? "Guardando..."
          : productoSeleccionado
          ? "Actualizar producto"
          : "Guardar producto"}
      </button>

      {productoSeleccionado && (
        <button type="button" className="secundario" onClick={handleCancelar}>
          Cancelar
        </button>
      )}

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  );
}
