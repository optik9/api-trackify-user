import app from '../src/app.js';

export default async (req, res) => {
  try {
    // 1. Configurar headers CORS manualmente
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 2. Manejar solicitudes OPTIONS
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // 3. Modificar URL para eliminar prefijo /api
    const originalUrl = req.url;
    req.url = originalUrl.startsWith('/api') 
      ? originalUrl.slice(4) 
      : originalUrl;

    // 4. Pasar la solicitud a Express
    app(req, res);

  } catch (error) {
    console.error('Error crítico:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
};