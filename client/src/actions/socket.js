import io from 'socket.io-client';

class Socket {
    
    constructor() {
        this.socket = io('http://localhost:3000');
    }
    
    createAction( email, type, message, author, callback, fromAdmin = false ) {
    
        this.socket.emit('NEW_MESSAGE', {
            email,
            type,
            message,
            author,
            fromAdmin
        }, callback);
    }
    
    addUser(email) {
        this.socket.emit('ADD_USER', {
            email
        });
    }
}

export default new Socket();
