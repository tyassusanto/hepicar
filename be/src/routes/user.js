const express = require('express');
const route = express.Router();
const userController = require('../controllers/users');

route.post('/login', userController.loginUser) 
route.post('/register', userController.addUser) 

module.exports = route