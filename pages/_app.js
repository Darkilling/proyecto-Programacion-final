import "@/styles/globals.css";
import { AuthProvider } from '../components/autorizacion';
import { CartProvider } from '../components/Carrito';

export default function App({ Component, pageProps }) {
  return(
  <AuthProvider>
  <CartProvider>
    <Component {...pageProps} />;
  </CartProvider>
  </AuthProvider>
 )
}
