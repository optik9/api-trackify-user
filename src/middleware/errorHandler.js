const errorHandler = (err, req, res, next) => {
    console.error('[Error]', err.stack);
    
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  };
  
  export default errorHandler;