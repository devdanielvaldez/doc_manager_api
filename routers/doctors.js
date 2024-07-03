const express = require('express');
const router = express.Router();
const {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    getAllProfiles
} = require('../controllers/Doctors');

// Ruta para crear un nuevo doctor
router.post('/create', createDoctor);

// Ruta para obtener todos los doctores
router.get('/get-all', getAllDoctors);

// Ruta para obtener un doctor por ID
router.get('/get-by-id/:id', getDoctorById);

// Ruta para actualizar un doctor por ID
router.put('/update/:id', updateDoctor);

// Ruta para eliminar un doctor por ID
router.delete('/delete/:id', deleteDoctor);

router.get('/all-profiles', getAllProfiles);

module.exports = router;
