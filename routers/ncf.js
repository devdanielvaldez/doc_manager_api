const express = require('express');
const router = express.Router();
const {
    createNCF,
    getAllNCFs,
    getNCFById,
    updateNCF,
    deleteNCF,
    getNCFsByProfileId
} = require('../controllers/ncf');

// Ruta para crear un nuevo NCF
router.post('/create', createNCF);

// Ruta para obtener todos los NCFs
router.get('/get-all', getAllNCFs);

router.get('/profile/:profileId', getNCFsByProfileId);

// Ruta para obtener un NCF por ID
router.get('/get-by-id/:id', getNCFById);

// Ruta para actualizar un NCF por ID
router.put('/update/:id', updateNCF);

// Ruta para eliminar un NCF por ID
router.delete('/delete/:id', deleteNCF);

module.exports = router;
