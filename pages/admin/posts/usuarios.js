import React, { useState, useEffect } from 'react';

export default function Usuarios({ post, onSubmit, onReset }) {
    const [id, setId] = useState(post ? post.id : '');
    const [username, setUsername] = useState(post ? post.username : '');
    const [password, setPassword] = useState(post ? post.password : '');
    const [realName, setRealName] = useState(post ? post.real_name : '');
    const [email, setEmail] = useState(post ? post.email : '');
  
    useEffect(() => {
      if (post) {
        setId(post.id);
        setUsername(post.username);
        setPassword(post.password);
        setRealName(post.real_name);
        setEmail(post.email);
      } else {
        setId('');
        setUsername('');
        setPassword('');
        setRealName('');
        setEmail('');
      }
    }, [post]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/api/users/${id}` : '/api/users';
      const body = JSON.stringify({ username, password, real_name: realName, email });
    
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
    
      if (typeof onSubmit === 'function') {
        onSubmit();
      }
      handleReset();
    };
  
    const handleReset = () => {
      setId('');
      setUsername('');
      setPassword('');
      setRealName('');
      setEmail('');
      if (typeof onReset === 'function') {
        onReset();
      }
    };

  return (
  

<form onSubmit={handleSubmit} class="w-3/5 mx-auto">
  <h1 className="text-2xl font-bold my-4">Ingresar usuario</h1>
  <input type="hidden" value={id} onChange={(e) => setId(e.target.value)} />
  <input
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="Usuario"
    class="m-2 text-black w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
  />
  <br />
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Contraseña"
    class="m-2 text-black w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
  />
  <br />
  <textarea
    value={realName}
    onChange={(e) => setRealName(e.target.value)}
    placeholder="Nombre"
    class="m-2 text-black w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
  />
  <br />
  <textarea
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email"
    class="m-2 text-black w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
  />
  <br />
  <button type="submit" class="box-border m-2 w-2/5 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
    {post ? 'Actualizar' : 'Crear'}
  </button>
  <button type="button" onClick={handleReset} class="box-border m-2 w-2/5 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
    Limpiar
  </button>
</form>
    
  );
}
