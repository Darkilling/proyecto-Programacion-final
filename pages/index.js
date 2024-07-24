import { Inter } from "next/font/google";
import Link from "next/link";
import Productos from "./productos"; // Importa el componente Productos
import Header from "../components/header"; // Importa el componente Header
import Footer from "../components/footer"; // Importa el componente Footer

const inter = Inter({ subsets: ["latin"] });

export default function Home({ productos }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <Header /> {/* Renderiza el componente Header */}
      
      <div>
        <Productos productos={productos} /> {/* Renderiza el componente Productos */}
      </div>
      <p>Estamos trabajando Para Usted!</p>
      <Link href="/productos" className="text-blue-500">
        Ver productos
      </Link>
      <Footer /> {/* Renderiza el componente Footer */}
    </main>
  );
}

// Obtener productos desde el servidor
export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/products');
  const productos = await res.json();

  return { props: { productos } };
}