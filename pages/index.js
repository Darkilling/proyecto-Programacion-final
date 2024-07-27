
import Link from "next/link";
import Image from "next/image";
import Header from "../components/header"; // Importa el componente Header
import Footer from "../components/footer"; // Importa el componente Footer
import { useCart } from "../components/Carrito"; // Importa el contexto del carrito de compras
import { useAuth } from "../components/autorizacion"; // Importa el contexto de autenticación


export async function getServerSideProps() {
  // Cambia la URL por la ruta correcta de tu API
  const res = await fetch('http://localhost:3000/api/products');
  const productos = await res.json();

  return { props: { productos } };
}

export default function Home({ productos }) {
  const { addToCart, cartItems, removeFromCart, handleQuantityChange  } = useCart(); // Usar el contexto del carrito de compras
   


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Header />
    <div className="flex w-full justify-between mt-8">
        <div className="w-2/3 border p-4 rounded-lg">
          <h1>Productos</h1>
          <ul className="shadow-lg rounded-lg p-4">
            {productos.map((producto) => (
              <li key={producto.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <Link href={`/productos/${producto.id}`} passHref>
                  <div className="flex flex-col items-start cursor-pointer text-center">
                    <span className="text-sm text-gray-300">Nombre: {producto.name}</span>
                    <span className="text-sm text-gray-300">Codigo: {producto.code}</span>
                    <span className="text-sm text-gray-300">Categoria: {producto.category}</span>
                    <span className="text-sm text-gray-300">Descripcion: {producto.description}</span>
                    <span className="text-sm text-gray-300">Lugar: {producto.location}</span>
                    <span className="text-sm text-gray-300">Disponibilidad: {producto.availability}</span>
                    <img src={`/juegos/${producto.image}`} alt={producto.name} width={600} height={400} className="mb-4 rounded-lg" />
                  </div>
                </Link>
                <button
                  onClick={() => addToCart(producto)}
                  className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Agregar al Carrito
                </button>
              </li>
            ))}
          </ul>
        </div>
  
        <div className="w-1/3 h-full bg-gray-800 shadow-lg p-6 overflow-y-auto ml-4 border border-white">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Carrito</h2>
      <ul className="list-disc pl-5">
      {cartItems.map((item) => (
      <li key={item.id} className="text-lg text-white flex justify-between items-center border-b border-white pb-2 mb-2">
        {item.name} - Cantidad: {item.quantity}
        <input
          type="number"
          value={item.quantity}
          min="1"
          className="ml-2 w-16 p-1 border rounded bg-gray-700 text-white border-white"
          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
        />
        <button
          className="ml-4 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors border border-white"
          onClick={() => removeFromCart(item.id)}
        >
          Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </main> 
);
}