const express = require('express');
const router = express.Router();
const { createARS, getAllARS, getARSById, updateARS, deleteARS } = require('../controllers/Ars');

// Ruta para crear un nuevo ARS
router.post('/create', createARS);

// Ruta para obtener todos los ARS
router.get('/all', getAllARS);

// Ruta para obtener un ARS por ID
router.get('/get-by-id/:id', getARSById);

// Ruta para actualizar un ARS por ID
router.put('/update/:id', updateARS);

// Ruta para eliminar un ARS por ID
router.delete('/delete/:id', deleteARS);

module.exports = router;
