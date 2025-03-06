import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import timeSheetRoutes from './routes/timeSheetRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// 1. Configuración de CORS (debe ser el primer middleware)
app.use(cors({
  origin: '*', // Permitir temporalmente todos los orígenes
  methods: ['GET', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type']
}));

// 2. Manejar explícitamente las solicitudes OPTIONS
app.options('*', cors());

// 3. Middleware para agregar headers manualmente
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Resto de tu código (rutas, middlewares, etc.)
app.use(express.json());
//app.use('/api/v1/timesheets', timeSheetRoutes);
app.use('/v1/timesheets', timeSheetRoutes);
app.use(errorHandler);

export default app;



