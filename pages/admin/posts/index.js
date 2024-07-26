import React from 'react';
import Producto from './productos';
import Usuarios from './usuarios';
import Layout from '@/components/layout';

const AdminPost = () => {
  return (
    <Layout>
      <main>
        <div className="container mx-auto px-4 shadow-lg">
          <Producto />
          <Usuarios />
        </div>
      </main>
    </Layout>
  );
};

export default AdminPost;