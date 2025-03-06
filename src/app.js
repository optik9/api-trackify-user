import express from 'express';
import dotenv from 'dotenv';
import timeSheetRoutes from './routes/timeSheetRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
//app.use('/api/v1/timesheets', timeSheetRoutes);
// Cambiar la ruta base
app.use('/', timeSheetRoutes); // Eliminar el prefijo de ruta

// Error handling
app.use(errorHandler);

//app.listen(port, () => {
//  console.log(`Servidor escuchando en http://localhost:${port}`);
//});

// Elimina app.listen y exporta la app
export default app;