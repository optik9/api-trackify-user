import app from '../src/app.js';

// Crear un manejador de Express compatible con Vercel
export default async (req, res) => {
  // Añadir prefijo base a las rutas
  req.url = `/api/v1/timesheets${req.url}`;
  
  // Manejar la solicitud
  app(req, res, (err) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }
  });
};