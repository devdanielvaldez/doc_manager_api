const MedicalCenter = require('../models/medicalCenter');

// Crear un nuevo centro médico
const createMedicalCenter = async (req, res) => {
    try {
        const { centerName, status } = req.body;
        const newMedicalCenter = new MedicalCenter({ centerName, status });
        await newMedicalCenter.save();
        res.status(201).json({ message: "Centro médico creado correctamente", status: 201, data: newMedicalCenter });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Obtener todos los centros médicos
const getAllMedicalCenters = async (req, res) => {
    try {
        const medicalCentersList = await MedicalCenter.find();
        res.status(200).json({ message: "Lista de centros médicos obtenida correctamente", status: 200, data: medicalCentersList });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Obtener un centro médico por ID
const getMedicalCenterById = async (req, res) => {
    try {
        const { id } = req.params;
        const medicalCenter = await MedicalCenter.findById(id);
        if (!medicalCenter) {
            return res.status(404).json({ message: "Centro médico no encontrado", status: 404 });
        }
        res.status(200).json({ message: "Centro médico obtenido correctamente", status: 200, data: medicalCenter });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Actualizar un centro médico por ID
const updateMedicalCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const { centerName, status } = req.body;
        const updatedMedicalCenter = await MedicalCenter.findByIdAndUpdate(id, { centerName, status }, { new: true });
        if (!updatedMedicalCenter) {
            return res.status(404).json({ message: "Centro médico no encontrado", status: 404 });
        }
        res.status(200).json({ message: "Centro médico actualizado correctamente", status: 200, data: updatedMedicalCenter });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Eliminar un centro médico por ID
const deleteMedicalCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMedicalCenter = await MedicalCenter.findByIdAndDelete(id);
        if (!deletedMedicalCenter) {
            return res.status(404).json({ message: "Centro médico no encontrado", status: 404 });
        }
        res.status(200).json({ message: "Centro médico eliminado correctamente", status: 200 });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

module.exports = {
    createMedicalCenter,
    getAllMedicalCenters,
    getMedicalCenterById,
    updateMedicalCenter,
    deleteMedicalCenter
};
