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
      console.log('Inicio de sesión correcto', data);
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
    
  };

  return (
    <main>
      {!isAuthenticated ? (
        <>
          <div className="mb-32 grid text-center lg:max-w-12xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-center">
            <h1 className="text-4xl font-bold">Bienvenido a INACAPludi</h1>
            <p className="text-xl">Aquí encontrarás los mejores productos Para Jugar con tus amigos o compañeros</p>
          </div>
          <form onSubmit={handleLogin} className="block text-gray-700 text-sm font-bold mb-2 ">
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
              placeholder="***************"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
        <div className="flex justify-center">
        <button type="submit" className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Iniciar Sesión
        </button>
</div>
          </form>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </>
      ) : (
        <div className="flex items-center justify-center mx-auto">
          <span className="m-2 text-white">Bienvenido a Ludoteca, {userDisplayName}</span>
          <button onClick={handleLogout} className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Cerrar Sesión
          </button>
        </div>
      )}
    </main>
  );
}