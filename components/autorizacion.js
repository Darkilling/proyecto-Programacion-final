// context/AuthContext.js
import { createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Asegúrate de exportar también el proveedor del contexto si es necesario
export const AuthProvider = ({ children }) => {
  // Lógica para manejar la autenticación

  return <AuthContext.Provider value={{ /* valores que quieres proveer */ }}>
    {children}
  </AuthContext.Provider>;
}