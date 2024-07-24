import { Inter } from "next/font/google";
import Link from "next/link";


export async function getServerSideProps() {
  
  const res = await fetch('http://localhost:3000/api/products');
  const productos = await res.json();

  // Pasar productos a la página a través de props
  return { props: { productos } };
}

export default function Productos({ productos }) {
    return (
      <div>
        <h1>Productos</h1>
        <ul>
        {productos.map((producto) => (
            <li key={producto.id}>
            <Link href={`/productos/${producto.id}`}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{producto.name}</span>
                <span>{producto.code}</span>
                <span>{producto.category}</span>
                <span>{producto.description}</span>
                <span>{producto.location}</span>
                </div>
            </Link>
            </li>
        ))}
        </ul>
        </div>
        );
  }