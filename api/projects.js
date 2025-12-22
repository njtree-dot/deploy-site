export default async function handler(req, res) {
  // In-memory projects array
  global.projectsData = global.projectsData || [];

  if (req.method === 'GET') {
    return res.status(200).json(global.projectsData);
  }

  if (req.method === 'POST') {
    try {
      const data = req.body;
      if (Array.isArray(data)) {
        global.projectsData = data;
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ error: 'Invalid data' });
      }
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
