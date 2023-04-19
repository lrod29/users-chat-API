const db = require('mongoose');
const Model = require('./model');

db.Promise = global.Promise;
db.connect('mongodb+srv://luis29rod:pajaro18@cluster0.kb88eye.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
console.log('[db] conectada con exito');

function addMessage(message){
    const myMessage = new Model(message);
    myMessage.save();

}

async function getMessages(filterChat){
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterChat !== null) {
            filter = {chat: filterChat};
        }
        Model.find(filter)
        .populate('user')
        .then((list) => {
            resolve(list);
        })
        .catch(e => {
            return reject(e);
        });
    
    });
    
}

async function updateText(id, message) {
    const foundMessage = await Model.findOne({
        _id: id
    });

    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

function removeMessage(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    remove: removeMessage
}