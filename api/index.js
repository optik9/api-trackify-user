import app from '../src/app.js';

export default async (req, res) => {
  try {
    // 1. Guardar la URL original para logging
    const originalUrl = req.url;
    
    // 2. Modificar la URL para eliminar el prefijo /api
    req.url = originalUrl.startsWith('/api') 
      ? originalUrl.slice(4) 
      : originalUrl;

    // 3. Logs para diagnóstico (opcional)
    console.log('───────────────────────────');
    console.log('Solicitud entrante:');
    console.log(`Método: ${req.method}`);
    console.log(`Original URL: ${originalUrl}`);
    console.log(`Nueva URL: ${req.url}`);
    
    // 4. Headers importantes
    console.log('Headers:', {
      host: req.headers.host,
      'user-agent': req.headers['user-agent']
    });

    // 5. Manejar la solicitud con Express
    app(req, res, (error) => {
      if (error) {
        console.error('Error en el manejo de la solicitud:', error);
        res.status(500).json({
          status: 'error',
          message: 'Error interno del servidor'
        });
      }
    });

  } catch (error) {
    console.error('Error crítico:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};