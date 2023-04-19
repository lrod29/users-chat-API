const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files/');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});



router.get('/', (req, res) => {

    const filterMessages = req.query.chat || null;
    controller.getMessages(filterMessages)
    .then((messageList) => {
        response.success(req, res, messageList, 200);
    })
    .catch(e => {
        response.error(req, res, 'Error inesperado', 500, e);
    });
});


router.post('/', upload.single('file'), (req, res) => {

    console.log(req.file);
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((fullMessage) => {
        response.success(req, res, fullMessage, 201);
    })
    .catch(e => {
        response.error(req, res, 'Informacion inavalida', 400, 'error en el controlador')
    });

});

router.patch('/:id', (req, res) => {

    console.log(req.params.id);
    controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, 'Error interno', 500, e);
    });
    
});

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
    .then(() => {
        response.success(req, res, `mensaje de usuario ${req.params.id} eliminado`, 200);
    })
    .catch(e => {
        response.error(req, res, 'Error interno', 500, e);
    });
});

module.exports = router;