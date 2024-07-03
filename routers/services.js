const express = require('express');
const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
} = require('../controllers/Services');

// Ruta para crear un nuevo servicio
router.post('/create', createService);

// Ruta para obtener todos los servicios
router.get('/get-all', getAllServices);

// Ruta para obtener un servicio por ID
router.get('/get-by-id/:id', getServiceById);

// Ruta para actualizar un servicio por ID
router.put('/update/:id', updateService);

// Ruta para eliminar un servicio por ID
router.delete('/delete/:id', deleteService);

module.exports = router;
