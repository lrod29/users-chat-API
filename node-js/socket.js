const socketIO = require('socket.io');
//objeto funciona como punteros en C
const socket = {};

function connect(server) {
    socket.io = socketIO(server);
}

module.exports = {
    connect,
    socket
};