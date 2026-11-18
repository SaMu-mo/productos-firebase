import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/productoService";
import type { Producto } from "../services/productoService";

interface Props {
  recargar: number;
}

export default function ProductoLista({ recargar }: Props) {
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
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.precio}</td>
                <td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
