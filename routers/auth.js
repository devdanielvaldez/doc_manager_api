const routers = require('express').Router();
const {
    registerUser,
    loginUser,
    registerDoctor
} = require('../controllers/AuthUsers');

routers.post('/register', registerUser);
routers.post('/login', loginUser);
routers.post('/register/doctors', registerDoctor);

module.exports = routers;