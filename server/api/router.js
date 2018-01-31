const express = require('express');
const validator = require('pure-validator');
let router = express.Router();
const User = require('../models/Users');
const Actions = require('../models/Actions');

router.post('/api/login', async (req, res) => {
    
    const { email, name } = req.body;
    let savedUser;
    
    if( !validator.isEmail(email) || !validator.isLength(name, 3)) {
        res.status(400);
        res.send({
            status: '400',
            data: null,
            message: 'Credentials error'
        });
        return null
    }
    
    const user = await User.findOne({email});
    
    if (!user) {
        savedUser = await new User({ email, name, createdAt: new Date() }).save();
    
        User.findOneAndUpdate({email}, {$set: {lastVisit: new Date() } }, {new: true}, (error, obj) => {
            console.log(error)
        });
        res.status(200);
        res.send({
            status: '200',
            data: savedUser,
            message: 'ok'
        });
        return null
    }
    User.findOneAndUpdate({email}, {$set: {lastVisit: new Date() } }, {new: true}, (error, obj) => {
        console.log(error)
    });
    res.status(200);
    res.send({
        status: '200',
        data: user,
        message: 'ok'
    });
});

// Get users for
router.get('/api/getUsers', async (req, res) => {
    const users =  await User.find();
    res.status(200);
    res.send({
        status: '200',
        data: users,
        message: 'ok'
    });
});

// Create action for Admin and Client
router.post('/api/createAction/:email', async (req, res) => {
    const { email } = req.params;
    const { type, message, author } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
        res.send(null);
        return null
    }
    
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
    res.status(200);
    res.send({
        status: '200',
        data: savedAction,
        message: 'ok'
    });
});

// Get all actions fpr user for Admin and client
router.get('/api/getActions/:email', async (req, res) => {
    const { email } = req.params;
    const user = await User.findOne({email});
    
    const actions =  await Actions.find({userId : user._id.toString()});
    res.status(200);
    res.send({
        status: '200',
        data: actions,
        message: 'ok'
    });
});


router.get('/api/getActionsByType/:email/:type', async (req, res) => {
    const { email, type } = req.params;
    const user = await User.findOne({email});
    const actions =  await Actions.find({userId : user._id.toString(), type});
    res.status(200);
    res.send({
        status: '200',
        data: actions,
        message: 'ok'
    });
});


router.get('/api/getActions', async (req, res) => {
    const actions =  await Actions.find();
    res.status(200);
    res.send({
        status: '200',
        data: actions,
        message: 'ok'
    });
});

module.exports = router;