import timeSheetModel from '../models/timeSheetModel.js';

const timeSheetController = {
  async getUserTimeSheets(req, res, next) {
    try {
      const { userId } = req.params;
      
      if (!Number.isInteger(Number(userId))) {
        return res.status(400).json({
          status: 'error',
          message: 'ID de usuario inválido'
        });
      }

      const results = await timeSheetModel.getByUserId(userId);
      
      if (results.length === 0) {
        return res.status(404).json({
          status: 'success',
          message: 'No se encontraron registros',
          data: []
        });
      }

      res.status(200).json({
        status: 'success',
        results: results.length,
        data: results
      });

    } catch (error) {
      next(error);
    }
  }
};

export default timeSheetController;