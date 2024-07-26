import React from 'react';
import Producto from './productos';
import Usuarios from './usuarios';

const AdminPost = () => {
  return (
    <main>
      <div className="container mx-auto px-4">
        <Producto />
        <Usuarios />
      </div>
    </main>
  );
};

export default AdminPost;


