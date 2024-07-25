
import Link from "next/link";
import Image from "next/image";
import Header from "../components/header"; // Importa el componente Header
import Footer from "../components/footer"; // Importa el componente Footer



export async function getServerSideProps() {
  // Cambia la URL por la ruta correcta de tu API
  const res = await fetch('http://localhost:3000/api/products');
  const productos = await res.json();

  return { props: { productos } };
}

export default function Home({ productos }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <div className="border p-4 rounded-lg">
        <h1>Productos</h1>
        <ul className="shadow-lg rounded-lg p-4">
          {productos.map((producto) => (
            <li key={producto.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <Link href={`/productos/${producto.id}`} passHref>
                <div className="flex flex-col items-start cursor-pointer">
                  <span className="font-semibold">{producto.name}</span>
                  <span className="text-sm text-gray-600">{producto.code}</span>
                  <span className="text-sm">{producto.category}</span>
                  <span className="text-sm text-gray-300">{producto.description}</span>
                  <span className="text-sm text-gray-500">{producto.location}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  );
}