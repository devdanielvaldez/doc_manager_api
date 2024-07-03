const express = require('express');
const router = express.Router();
const { createSpeciality, getAllSpecialities, getSpecialityById, updateSpeciality, deleteSpeciality } = require('../controllers/Speciality');

// Ruta para crear una nueva especialidad
router.post('/create', createSpeciality);

// Ruta para obtener todas las especialidades
router.get('/get-all', getAllSpecialities);

// Ruta para obtener una especialidad por ID
router.get('/get-by-id/:id', getSpecialityById);

// Ruta para actualizar una especialidad por ID
router.put('/update/:id', updateSpeciality);

// Ruta para eliminar una especialidad por ID
router.delete('/delete/:id', deleteSpeciality);

module.exports = router;
