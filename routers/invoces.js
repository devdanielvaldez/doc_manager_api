const express = require('express');
const router = express.Router();
const {
    getAllInvoices,
    getInvoiceById,
    filterInvoices,
    deleteInvoice,
    createInvoice,
    updateStatus
} = require('../controllers/invoces');

// Ruta para ver todas las facturas
router.post('/create', createInvoice);
router.get('/get-all', getAllInvoices);

// Ruta para ver una factura por ID
router.get('/get-by-id/:id', getInvoiceById);

// Ruta para filtrar facturas
router.get('/filter', filterInvoices);
router.get('/update/status/:id/:status', updateStatus);

// Ruta para eliminar una factura por ID
router.delete('/delete/:id', deleteInvoice);

module.exports = router;
