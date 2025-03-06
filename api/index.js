import app from '../src/app.js';

// Configuración especial para Vercel + Express
export default async (req, res) => {
  // Mantener el path original
  const originalUrl = req.url;
  
  // Modificar el path para eliminar el prefijo /api
  req.url = originalUrl.replace('/api', '');
  
  // Registrar para debug
  console.log(`Original URL: ${originalUrl}`);
  console.log(`Modified URL: ${req.url}`);
  
  // Manejar la solicitud
  return app(req, res);
};