const express = require('express');
const app = express();  
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');

db('mongodb+srv://luis29rod:pajaro18@cluster0.kb88eye.mongodb.net/?retryWrites=true&w=majority');

app.use(cors());


//trabajar con el body de manera mas facil para ficheros json
app.use(bodyParser.json());

socket.connect(server);

//podremos definir todas las rutas que tendrá la app y sus metodos
router(app);



//para todas las rutas de app las busca en la carpeta public
app.use('/app', express.static('public'));



//acivamos el puerto para atender las solicitudes
server.listen(3000, () => {
    console.log('La aplicación está escuchando en http://localhost:3000');
});

