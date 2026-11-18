import { useEffect, useState } from "react";
import {
  obtenerProductos,
  eliminarProducto,
  type Producto,
} from "../services/productoService";

interface Props {
  recargar: number;
  onEditar: (producto: Producto) => void;
  onEliminado: (id: string) => void;
}

export default function ProductoLista({
  recargar,
  onEditar,
  onEliminado,
}: Props) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [recargar]);

  const handleEliminar = async (id: string) => {
    try {
      await eliminarProducto(id);
      setProductos((anteriores) => anteriores.filter((p) => p.id !== id));
      onEliminado(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="lista">
      <h1>Productos</h1>

      {cargando && <p>Cargando...</p>}

      {!cargando && productos.length === 0 && <p>No hay productos registrados</p>}

      {productos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.precio}</td>
                <td>{p.stock}</td>
                <td>
                  <div className="acciones">
                    <button onClick={() => onEditar(p)}>Editar</button>
                    <button
                      className="eliminar"
                      onClick={() => handleEliminar(p.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
