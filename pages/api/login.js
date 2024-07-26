import { openDb } from '../../db';

export default async function handler(req, res) {
  const db = await openDb();

  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const user = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
      
      if (user) {
        // Aquí puedes generar un token de sesión o realizar otras acciones de autenticación
        res.status(200).json({ message: 'ingreso exitoso', user: user });
      } else {
        res.status(401).json({ message: 'credenciales invalidas' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'error interno en el servidor' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
    // Manejo de otros métodos HTTP si es necesario
  }
}