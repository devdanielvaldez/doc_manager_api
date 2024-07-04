const Invoices = require('../models/invoces');
const Doctor = require('../models/doctors');

const dashboardReport = async(req, res) => {
    try {
        const payInvoces = await Invoices.find({ invoceStatus: 'PAY' });
        const noPayInvoces = await Invoices.find({ invoceStatus: 'PENDING' });
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
        })
    } catch(err) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado",
            error: err
        })
    }
}

module.exports = {
    dashboardReport
}