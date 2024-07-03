const Doctor = require('../models/doctors');
const Profile = require('../models/profile');

const getAllProfiles = async (req, res) => {
    try {
        const profiles = Profile.find();
        return res.status(200).json({
            ok: true,
            data: profiles
        })
    } catch(err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
}

// Crear un nuevo doctor
const createDoctor = async (req, res) => {
    try {
        const { stateId, code, phone, speciality } = req.body;
        const newDoctor = new Doctor({ stateId, code, phone, speciality });
        await newDoctor.save();
        res.status(201).json({ message: "Doctor creado correctamente", status: 201, data: newDoctor });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Obtener todos los doctores
const getAllDoctors = async (req, res) => {
    try {
        const doctorList = await Doctor.find().populate('speciality').populate('profileId');
        res.status(200).json({ message: "Lista de doctores obtenida correctamente", status: 200, data: doctorList });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Obtener un doctor por ID
const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findById(id).populate('speciality');
        if (!doctor) {
            return res.status(404).json({ message: "Doctor no encontrado", status: 404 });
        }
        res.status(200).json({ message: "Doctor obtenido correctamente", status: 200, data: doctor });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Actualizar un doctor por ID
const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { stateId, code, phone, speciality } = req.body;
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { stateId, code, phone, speciality }, { new: true });
        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor no encontrado", status: 404 });
        }
        res.status(200).json({ message: "Doctor actualizado correctamente", status: 200, data: updatedDoctor });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Eliminar un doctor por ID
const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDoctor = await Doctor.findByIdAndDelete(id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: "Doctor no encontrado", status: 404 });
        }
        res.status(200).json({ message: "Doctor eliminado correctamente", status: 200 });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    getAllProfiles
};
