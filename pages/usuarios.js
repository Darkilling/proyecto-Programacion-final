import { Inter } from "next/font/google";
import Link from "next/link";

export default function Usuarios({ usuarios }) {
  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <Link href={`/usuarios/${usuario.id}`}>
              <a>{usuario.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}