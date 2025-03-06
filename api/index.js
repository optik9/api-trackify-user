import app from '../src/app.js';

export default async (req, res) => {
  try {
    await app.ready();
    app.server.emit('request', req, res);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};