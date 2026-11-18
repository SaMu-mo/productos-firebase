import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
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

export async function actualizarProducto(
  id: string,
  nombre: string,
  precio: number,
  stock: number
): Promise<void> {
  await updateDoc(doc(db, "productos", id), {
    nombre,
    precio,
    stock,
  });
}

export async function eliminarProducto(id: string): Promise<void> {
  await deleteDoc(doc(db, "productos", id));
}
