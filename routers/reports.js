const express = require('express');
const router = express.Router();
const {
    dashboardReport
} = require('../controllers/Reports');

router.get('/get', dashboardReport);

module.exports = router;
