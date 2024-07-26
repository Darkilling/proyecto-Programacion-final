import React, { useState } from 'react';

export default function Header() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState('');
  const [message, setMessage] = useState('');

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
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Inicio de sesión exitoso', data);
      setIsAuthenticated(true);
      setUserDisplayName(username);
      setUsername('');
      setPassword('');
      setMessage('');
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      setMessage(error.message);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserDisplayName('');
    setMessage('');
    // Aquí puedes limpiar también el token de sesión o realizar otras acciones de limpieza
  };

  return (
    <main>
      {!isAuthenticated ? (
        <>
          <div className="mb-32 grid text-center lg:max-w-12xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-center">
            <h1 className="text-4xl font-bold">Bienvenido a INACAPludi</h1>
            <p className="text-xl">Inicia sesión para encontrar los mejores productos al mejor precio.</p>
          </div>
          <form onSubmit={handleLogin} className="flex items-center justify-center mx-auto">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de Usuario"
              className="m-2 text-black"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="m-2 text-black"
              required
            />
            <button type="submit" className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Iniciar Sesión
            </button>
          </form>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </>
      ) : (
        <div className="flex items-center justify-center mx-auto">
          <span className="m-2 text-white">Hola, {userDisplayName}</span>
          <button onClick={handleLogout} className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Cerrar Sesión
          </button>
        </div>
      )}
    </main>
  );
}