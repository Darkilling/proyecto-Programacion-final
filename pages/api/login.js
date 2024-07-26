// /pages/api/login.js
import { openDb } from '../../db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const db = await openDb();
      const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

      if (!user.username) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Aquí puedes generar un token de sesión o realizar otras acciones de autenticación
      res.status(200).json({ message: 'Login successful', username: user.username });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}