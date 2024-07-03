const routers = require('express').Router();
const Auth = require('./auth');
const ARS = require('./ars');
const Speciality = require('./specialitys');
const MedicalCenter = require('./medicalCenter');
const NCF = require('./ncf');
const Services = require('./services');
const Doctors = require('./doctors');
const Invoces = require('./invoces');

routers.use('/auth', Auth);
routers.use('/ars', ARS);
routers.use('/specialitys', Speciality);
routers.use('/medical-center', MedicalCenter);
routers.use('/ncf', NCF);
routers.use('/services', Services);
routers.use('/doctors', Doctors);
routers.use('/invoces', Invoces);

module.exports = routers;