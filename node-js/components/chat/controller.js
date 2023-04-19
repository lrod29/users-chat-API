const store = require('./store');

function addChat(users) {
    if (!users || !Array.isArray(users)) {
        return Promise.reject('[controller chat] Invalid name');
    }
    const chat = {
        users: users
    };

    return store.add(chat);
}

function listChat(userId) {
    return store.list(userId);
}

module.exports = {
    addChat,
    listChat
};