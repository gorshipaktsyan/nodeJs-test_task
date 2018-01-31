const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const { serverPort } = require('./etc/config.json');
let app = express();
let server = http.createServer(app);
let socket = socketIO(server);
let users = require('./utils/users');
const router = require('../server/api/router');
require('./utils/db-connect');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || serverPort;
const validator = require('pure-validator');
const User = require('./models/Users');
const Actions = require('./models/Actions');
app.use(express.static(publicPath));
app.use(bodyParser.json());

app.use('/', router);

app.get('/*', (req, res) => {
    res.sendFile( `${publicPath}/index.html`);
});

socket.on("connection",  function (client) {
    console.log("A new Client connected", client.id);
    
    client.on('ADD_USER', ({ email }) => {
        users.addUser(client.id, email);
    });
    
    client.on('NEW_MESSAGE', async (data, callback) => {
        
        const { email, type, message, author, fromAdmin } = data;
        const user = await User.findOne({ email });
        const savedAction = await new Actions({
            userId: user._id.toString(),
            type,
            message: JSON.stringify(message),
            author,
            createdAt: new Date()
        }).save();
        User.findOneAndUpdate({email}, {$set: {lastVisit: new Date() } }, {new: true}, (error, obj) => {
            console.log(error)
        });
        callback(savedAction);
    
        const goalUser = fromAdmin ? users.getUser(email) : users.getUser('admin@gmail.com');
        
        if(goalUser) {
            client.broadcast.to(goalUser.id).emit('newMessage', savedAction);
        }
    });
    
    client.on("disconnect", function () {
        console.log("One of the client disconnected");
        users.removeUser(client.id)
    })
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
