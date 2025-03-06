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
  },

  async getAllUsersData(req, res, next) {
    try {
      const filters = {
        status: req.query.status,
        location: req.query.location
      };
  
      // Validación de location
      if (filters.location) {
        const allowedLocations = ['Peru', 'Nepal', 'USA', 'Other'];
        if (!allowedLocations.includes(filters.location)) {
          return res.status(400).json({
            status: 'error',
            message: 'Ubicación no válida. Opciones permitidas: ' + allowedLocations.join(', ')
          });
        }
      }
  
      const results = await timeSheetModel.getAllUsersData(filters);
      
      res.status(200).json({
        status: 'success',
        results: results.length,
        data: results
      });
  
    } catch (error) {
      console.error('Error en getAllUsersData:', error);
      res.status(500).json({
        status: 'error',
        message: process.env.NODE_ENV === 'development' 
          ? error.message 
          : 'Error interno del servidor'
      });
    }
  }
};

// Función auxiliar para validar fechas
function isValidDate(dateString) {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;
  const d = new Date(dateString);
  return d instanceof Date && !isNaN(d);
}

export default timeSheetController;