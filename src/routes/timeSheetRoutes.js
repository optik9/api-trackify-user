import express from 'express';
import timeSheetController from '../controllers/timeSheetController.js';

const router = express.Router();

router.get('/:userId', timeSheetController.getUserTimeSheets);

export default router;