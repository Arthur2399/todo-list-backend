const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//Crear el servidor de express
const app = express();

//Bases de datos
dbConnection();

//Escuchar peticiones 
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

//Directorio público
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));


//TODO AUTH CREAR LOGIN , REN
//CRUD Eventos