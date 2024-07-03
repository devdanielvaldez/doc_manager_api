const Speciality = require('../models/especialidades');

// Crear una nueva especialidad
const createSpeciality = async (req, res) => {
    try {
        const { specialityName, status } = req.body;
        const newSpeciality = new Speciality({ specialityName, status });
        await newSpeciality.save();
        res.status(201).json({ message: "Especialidad creada correctamente", status: 201, data: newSpeciality });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Obtener todas las especialidades
const getAllSpecialities = async (req, res) => {
    try {
        const specialitiesList = await Speciality.find();
        res.status(200).json({ message: "Lista de especialidades obtenida correctamente", status: 200, data: specialitiesList });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Obtener una especialidad por ID
const getSpecialityById = async (req, res) => {
    try {
        const { id } = req.params;
        const speciality = await Speciality.findById(id);
        if (!speciality) {
            return res.status(404).json({ message: "Especialidad no encontrada", status: 404 });
        }
        res.status(200).json({ message: "Especialidad obtenida correctamente", status: 200, data: speciality });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Actualizar una especialidad por ID
const updateSpeciality = async (req, res) => {
    try {
        const { id } = req.params;
        const { specialityName, status } = req.body;
        const updatedSpeciality = await Speciality.findByIdAndUpdate(id, { specialityName, status }, { new: true });
        if (!updatedSpeciality) {
            return res.status(404).json({ message: "Especialidad no encontrada", status: 404 });
        }
        res.status(200).json({ message: "Especialidad actualizada correctamente", status: 200, data: updatedSpeciality });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Eliminar una especialidad por ID
const deleteSpeciality = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSpeciality = await Speciality.findByIdAndDelete(id);
        if (!deletedSpeciality) {
            return res.status(404).json({ message: "Especialidad no encontrada", status: 404 });
        }
        res.status(200).json({ message: "Especialidad eliminada correctamente", status: 200 });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

module.exports = {
    createSpeciality,
    getAllSpecialities,
    getSpecialityById,
    updateSpeciality,
    deleteSpeciality
};
