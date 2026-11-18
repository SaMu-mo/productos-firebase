import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
}

export async function crearProducto(
  nombre: string,
  precio: number,
  stock: number
): Promise<string> {
  const docRef = await addDoc(collection(db, "productos"), {
    nombre,
    precio,
    stock,
  });
  return docRef.id;
}

export async function obtenerProductos(): Promise<Producto[]> {
  const snapshot = await getDocs(collection(db, "productos"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    nombre: doc.data().nombre,
    precio: doc.data().precio,
    stock: doc.data().stock,
  }));
}
