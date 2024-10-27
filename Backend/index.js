const express = require('express');
const cors = require('cors');
const db = require('./app/config/db.config.js'); // Importa la configuración de la base de datos
const config = require('./app/config/env.js'); // Archivo env.js

const paymentRoutes = require('./app/routers/payment.js'); // Importa las rutas de pago

const app = express(); // Inicializa app aquí
const PORT = process.env.PORT || 4000; // Puerto para Express

// Middleware para parsear JSON
app.use(cors());
app.use(express.json());

// Aplica las rutas de pago antes de cualquier otra configuración
app.use('/api/payment', paymentRoutes);

// Importar las rutas generales
const router = require('./app/routers/router.js'); // Asegúrate de que la ruta sea correcta
app.use('/api', router); // Aplicar el prefijo /api a todas las rutas

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Inicializa la conexión a la base de datos usando Sequelize
const init = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conectado a Oracle Database');
    // Aquí puedes realizar una consulta de prueba si lo deseas
    // const result = await db.Empleado.findAll(); // Ejemplo de consulta
    // console.log(result); // Muestra los datos en la consola
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
};

// Inicializa la conexión a la base de datos
init();

// Inicia el servidor Express
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
