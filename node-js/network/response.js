exports.success = (req, res, message, status) => {
    res.status(status || 200).send({
        error: '',
        body: message
});
};


//funcion de Errores que devuelve al cliente un mensaje de error, y detalles para los admin del server
exports.error = (req, res, message, status, details) => {
    console.log('response error: ' + details)
    res.status(status || 500).send({
        error: message,
        body: ''
});
};