import express from 'express';
import timeSheetController from '../controllers/timeSheetController.js';

const router = express.Router();

// Rutas finales (¡sin /api!)
router.get('/:userId', timeSheetController.getUserTimeSheets);
router.get('/', timeSheetController.getAllUsersData);

export default router;