const Model = require('./model');

function listChat(userId){
    return new Promise((resolve, reject) => {
        let filter = {};
        if (userId) {
            filter = {
                users: userId                 
            }
            
        }
        Model.find(filter)
        .populate('users')
        .then((list) => {
            resolve(list);
        })
        .catch(e => {
            return reject(e);
        });
    
    });
    
}

function addChat(chat) {
    const myUser = new Model(chat);
    return myUser.save();
}


module.exports = {
    add: addChat,
    list: listChat
}