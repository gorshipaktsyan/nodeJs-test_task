class Users {
    constructor () {
        this.users = [];
    }
    
    addUser (id, name) {
        let user = {id, name};
        this.users.push(user);
        return user;
    }
    
    removeUser (id) {
        let user = this.users.filter((user) => user.id === id)[0];
        
        if (user) {
            this.users = this.users.filter((user) => user.id !== id)
        }
        
        return user;
    }
    
    getUser (email) {
        return this.users.filter((user) => user.name === email)[0]
    }
}

module.exports = new Users();
