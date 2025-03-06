import app from '../src/app.js';

// Configuración específica para Vercel + Express
export default async (req, res) => {
  // Proxy de la solicitud a la app de Express
  app(req, res);
};