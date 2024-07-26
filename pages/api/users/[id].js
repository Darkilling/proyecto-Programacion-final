import { openDb } from '../../db';
export default async function handler(req, res) {
  const db = await openDb();
  const { id } = req.query;

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.run('INSERT INTO users (username, password, real_name, email) VALUES (?, ?, ?, ?)', [username, hashedPassword, real_name, email]);

  if (req.method === 'GET') {
    const item = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } else if (req.method === 'PUT') {
    const { username, password, real_name, email } = req.body;

    // Validar datos de entrada
    if (!username || !password || !real_name || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Verificar si el usuario existe
    const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await db.run('UPDATE users SET username = ?, password = ?, real_name = ?, email = ? WHERE id = ?', [username, password, real_name, email, id]);
    res.status(200).json({ message: 'User updated' });
  } else if (req.method === 'DELETE') {
    // Verificar si el usuario existe
    const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await db.run('DELETE FROM users WHERE id = ?', [id]);
    res.status(200).json({ message: 'User deleted' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
const tableInfo = await db.all('PRAGMA table_info(users)');
console.log('Table structure:', tableInfo);
const users = await db.all('SELECT * FROM users');
console.log('All users:', users);