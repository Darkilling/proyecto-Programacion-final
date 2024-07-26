import React, { useState } from 'react';
import backgroundImage from '../public/background/no1.jpeg'; //  ajustar la ruta a tu imagen

export default function Header() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Inicio de sesión exitoso', data);
      setIsAuthenticated(true);
      setUserDisplayName(username); 
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserDisplayName('');
    // Aquí puedes limpiar también el token de sesión o realizar otras acciones de limpieza
  };

  return (
    <header
      className="bg-grey shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      style={{
        backgroundImage: `url('/background/no1.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: '600% 70%',
        minHeight: '500px', // Asegura que el header cubra toda la altura de la ventana
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'left',
      }}
    >
      <h1 className="bg-grey font-times text-black text-4xl font-bold">INACAPludi</h1> {/* Agrandar y hacer más grueso el texto del encabezado */}
      {isAuthenticated ? (
        <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <span className="background-red text-black text-2xl font-bold mr-6">Bienvenido a Ludoteca, {userDisplayName}</span> {/* Agrandar y hacer más grueso el texto de bienvenida */}
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de Usuario"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <button type="submit" className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Iniciar Sesión
          </button>
        </form>
      )}
    </header>
  );
}
