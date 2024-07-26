import { openDb } from '../../../db';

export default async function handler(req, res) {
  try {
    const db = await openDb();

    if (req.method === 'GET') {
      const users = await db.all('SELECT * FROM users');
      console.log('Fetched users:', users); // Log para verificar los usuarios obtenidos
      res.status(200).json(users);
    } else if (req.method === 'POST') {
      const { id, username, password, real_name, email } = req.body;

      // Validar datos de entrada
      if (!id || !username || !password || !real_name || !email) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      await db.run('INSERT INTO users (id, username, password, real_name, email) VALUES (?, ?, ?, ?, ?)', [id, username, password, real_name, email]);
      res.status(201).json({ message: 'User created' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error); // Log para errores de base de datos
    res.status(500).json({ message: 'Internal server error' });
  }
}