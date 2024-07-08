const Invoices = require('../models/invoces');
const Doctor = require('../models/doctors');

const dashboardReport = async(req, res) => {
    try {
        const { role, id } = req.headers; // Capturar el rol y el id desde los headers

        let payInvoces;
        let noPayInvoces;

        if (role === 'DOCTOR') {
            // Filtrar las facturas por el id del doctor si el rol es DOCTOR
            payInvoces = await Invoices.find({ invoceStatus: 'PAY', doctor: id });
            noPayInvoces = await Invoices.find({ invoceStatus: 'PENDING', doctor: id });
        } else {
            // Obtener todas las facturas si el rol no es DOCTOR
            payInvoces = await Invoices.find({ invoceStatus: 'PAY' });
            noPayInvoces = await Invoices.find({ invoceStatus: 'PENDING' });
        }

        const doctors = await Doctor.countDocuments();
        const totalSum = noPayInvoces.reduce((sum, invoice) => {
            return sum + Number(invoice.totalAmount);
        }, 0);

        res.status(200).json({
            ok: true,
            pay: payInvoces.length,
            pending: noPayInvoces.length,
            totalPay: totalSum,
            doctors: doctors
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado",
            error: err
        });
    }
};

module.exports = {
    dashboardReport
}