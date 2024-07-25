// pages/usuarios.js
import { fetchUsuarios } from '../../api/users';


export default function Usuarios({ usuarios }) {
  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.username}>
            <p>ID: {usuario.id}</p>
            <p>Username: {usuario.username}</p>
            <p>Password: {usuario.password}</p>
            <p>Real Name: {usuario.real_name}</p>
            <p>Email: {usuario.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const usuarios = await fetchUsuarios();
  return {
    props: {
      usuarios,
    },
  };
}
