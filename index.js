const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./src/database/config');

//Crear el servidor de express
const app = express();

//Bases de datos
dbConnection();

//CORS
app.use(cors())

//Escuchar peticiones 
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

//Directorio público
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./src/routes/auth'));
