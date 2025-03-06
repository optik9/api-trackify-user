import express from 'express';
import dotenv from 'dotenv';
import timeSheetRoutes from './routes/timeSheetRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas (¡IMPORTANTE! sin prefijo /api)
app.use('/v1/timesheets', timeSheetRoutes);

// Manejador de errores
app.use(errorHandler);

// Exportación para Vercel
export default app;