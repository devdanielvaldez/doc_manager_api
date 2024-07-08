const Invoice = require('../models/invoces');
const Profile = require('../models/profile');
const Doctor = require('../models/doctors');
const MedicalCenter = require('../models/medicalCenter');
const NCF = require('../models/ncf');

// Ver todas las facturas
const getAllInvoices = async (req, res) => {
    try {
        const { role, id } = req.headers; // Capturar el rol y el id desde los headers

        let query = {};

        if (role === 'DOCTOR') {
            query = { doctor: id }; // Filtrar por el id del doctor si el rol es DOCTOR
        }

        const invoices = await Invoice.find(query)
            .populate('profile')
            .populate({
                path: 'doctor',
                populate: {
                    path: 'speciality'
                }
            })
            .populate('medicalCenter')
            .populate('ars')
            .populate('nfc')
            .populate('services');

        res.status(200).json({ message: "Lista de facturas obtenida correctamente", status: 200, data: invoices });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

const updateStatus = async (req, res) => {
    try {
        const invoices = await Invoice.findByIdAndUpdate(req.params.id, { invoceStatus: req.params.status });
        res.status(200).json({ message: "Factura actualizada correctamente", status: 200 });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
}

const createInvoice = async (req, res) => {
    try {
        const {
            profileId,
            medicalCenterId,
            ncfId,
            invoceDate,
            invoceFinal,
            services,
            totalAmount,
            ars,
            invoiceSrc
        } = req.body;

        // Buscar el perfil
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: "Perfil no encontrado", status: 404 });
        }

        // Buscar el doctor asociado al perfil
        const doctor = await Doctor.findOne({ profileId: profile._id });
        if (!doctor) {
            return res.status(404).json({ message: "Doctor no encontrado para el perfil dado", status: 404 });
        }

        // Verificar que el medicalCenterId y ncfId existen
        const medicalCenter = await MedicalCenter.findById(medicalCenterId);
        const ncf = await NCF.findById(ncfId);

        if (!medicalCenter || !ncf) {
            return res.status(404).json({ message: "Centro Médico o NCF no encontrado", status: 404 });
        }
        console.log(req.body);
        // Crear la factura
        const newInvoice = new Invoice({
            profile: profile._id,
            doctor: doctor._id,
            medicalCenter: medicalCenter._id,
            nfc: ncf._id,
            invoceDate: invoceDate,
            invoceFinal: invoceFinal,
            services,
            totalAmount,
            ars,
            invoiceSrc
        });

        await newInvoice.save();

        await NCF.findByIdAndUpdate(ncf._id, { state: 'USED' });

        // Populating the invoice
        const populatedInvoice = await Invoice.findById(newInvoice._id)
            .populate('profile')
            .populate({
                path: 'doctor',
                populate: {
                    path: 'speciality'
                }
            })
            .populate('medicalCenter')
            .populate('ars')
            .populate('nfc')
            .populate('services');

        res.status(201).json({ message: "Factura creada correctamente", status: 201, data: populatedInvoice });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Ver una factura por ID
const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id)
        .populate('profile')
        .populate({
            path: 'doctor',
            populate: {
                path: 'speciality'
            }
        })
        .populate('medicalCenter')
        .populate('ars')
        .populate('nfc')
        .populate('services');
        if (!invoice) {
            return res.status(404).json({ message: "Factura no encontrada", status: 404 });
        }
        res.status(200).json({ message: "Factura obtenida correctamente", status: 200, data: invoice });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Editar una factura por ID
const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { profile, doctor, medicalCenter, nfc, invoceDate, invoceFinal, services, totalAmount, invoceStatus } = req.body;
        const updatedInvoice = await Invoice.findByIdAndUpdate(id, { profile, doctor, medicalCenter, nfc, invoceDate, invoceFinal, services, totalAmount, invoceStatus }, { new: true });
        if (!updatedInvoice) {
            return res.status(404).json({ message: "Factura no encontrada", status: 404 });
        }
        res.status(200).json({ message: "Factura actualizada correctamente", status: 200, data: updatedInvoice });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Filtrar facturas
const filterInvoices = async (req, res) => {
    try {
        const { invoceStatus, doctor, medicalCenter, profile } = req.query;
        const filter = {};
        if (invoceStatus) filter.invoceStatus = invoceStatus;
        if (doctor) filter.doctor = doctor;
        if (medicalCenter) filter.medicalCenter = medicalCenter;
        if (profile) filter.profile = profile;

        const invoices = await Invoice.find(filter).populate('profile doctor medicalCenter nfc');
        res.status(200).json({ message: "Facturas filtradas correctamente", status: 200, data: invoices });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Eliminar una factura por ID
const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInvoice = await Invoice.findByIdAndDelete(id);
        if (!deletedInvoice) {
            return res.status(404).json({ message: "Factura no encontrada", status: 404 });
        }
        res.status(200).json({ message: "Factura eliminada correctamente", status: 200 });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

module.exports = {
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    filterInvoices,
    deleteInvoice,
    createInvoice,
    updateStatus
};