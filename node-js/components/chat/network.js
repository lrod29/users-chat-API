const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/:userId', (req, res) => {
    controller.listChat(req.params.userId)
    .then((chats) => {
        response.success(req, res, chats, 201);
    })
    .catch(e => {
        response.error(req, res, 'internal error', 500, e);
    })
});

router.post('/', (req, res) => {

    controller.addChat(req.body.users)
    .then((chat) => {
        response.success(req, res, chat, 201);
    })
    .catch(e => {
        response.error(req, res, 'Informacion inavalida', 400, 'error en el controlador')
    });

});

module.exports = router;