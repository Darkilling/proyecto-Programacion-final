import React, { useState, useEffect } from 'react';

export default function Usuarios({ post, onSubmit, onReset }) {
  const [id, setId] = useState(post ? post.id : '');
  const [username, setUsername] = useState(post ? post.username : '');
  const [password, setPassword] = useState(post ? post.password : '');
  const [realName, setRealName] = useState(post ? post.real_name : '');
  const [email, setEmail] = useState(post ? post.email : '');
  const [users, setUsers] = useState([]);
  const [editableUser, setEditableUser] = useState(null);
  const [editableValues, setEditableValues] = useState({});

  // Effect hook to update state when post changes
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

  // Fetch users from the database
  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/users/${id}` : '/api/users';
    const body = JSON.stringify({ username, password, real_name: realName, email });

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await response.json();
      if (method === 'POST') {
        setUsers([...users, data]);
      } else {
        setUsers(users.map(user => (user.id === id ? data : user)));
      }
      onReset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (user) => {
    setEditableUser(user.id);
    setEditableValues(user);
  };

  const handleSave = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editableValues),
      });
      const updatedUser = await response.json();
      setUsers(users.map(user => (user.id === userId ? updatedUser : user)));
      setEditableUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e, field) => {
    setEditableValues({
      ...editableValues,
      [field]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto p-4 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-red-700">Usuarios</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-4 w-full bg-gray-100 text-gray-800"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full bg-gray-100 text-gray-800"
        />
        <input
          type="text"
          placeholder="Nombre y Apellido"
          value={realName}
          onChange={(e) => setRealName(e.target.value)}
          className="border p-2 mb-4 w-full bg-gray-100 text-gray-800"
        />
        <input
          type="email"
          placeholder="correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full bg-gray-100 text-gray-800"
        />
        <button type="submit" className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {id ? 'Actualizar' : 'Ingresar'}
        </button>
      </form>
      <h2 className="text-2xl font-bold mb-4 text-red-700">CRUD</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t border-gray-300">
              <td className="py-2 px-4">
                {editableUser === user.id ? (
                  <input
                    type="text"
                    value={editableValues.username}
                    onChange={(e) => handleChange(e, 'username')}
                    className="border p-1 w-full bg-gray-100 text-gray-800"
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="py-2 px-4">
                {editableUser === user.id ? (
                  <input
                    type="text"
                    value={editableValues.email}
                    onChange={(e) => handleChange(e, 'email')}
                    className="border p-1 w-full bg-gray-100 text-gray-800"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="py-2 px-4">
                <div className="flex space-x-2">
                  {editableUser === user.id ? (
                    <button
                      onClick={() => handleSave(user.id)}
                      className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Modificar
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}