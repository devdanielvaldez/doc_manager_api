const express = require('express');
const router = express.Router();
const {
    createMedicalCenter,
    getAllMedicalCenters,
    getMedicalCenterById,
    updateMedicalCenter,
    deleteMedicalCenter
} = require('../controllers/medicalCenter');

// Ruta para crear un nuevo centro médico
router.post('/create', createMedicalCenter);

// Ruta para obtener todos los centros médicos
router.get('/get-all', getAllMedicalCenters);

// Ruta para obtener un centro médico por ID
router.get('/get-by-id/:id', getMedicalCenterById);

// Ruta para actualizar un centro médico por ID
router.put('/update/:id', updateMedicalCenter);

// Ruta para eliminar un centro médico por ID
router.delete('/delete/:id', deleteMedicalCenter);

module.exports = router;