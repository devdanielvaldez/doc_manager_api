const ARS = require('../models/ars');

// Crear un nuevo ARS
const createARS = async (req, res) => {
    try {
        const { arsName, rnc, status } = req.body;
        const newARS = new ARS({ arsName, rnc, status });
        await newARS.save();
        res.status(201).json({ message: "ARS creado correctamente", status: 201, data: newARS });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Obtener todos los ARS
const getAllARS = async (req, res) => {
    try {
        const arsList = await ARS.find();
        res.status(200).json({ message: "Lista de ARS obtenida correctamente", status: 200, data: arsList });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Obtener un ARS por ID
const getARSById = async (req, res) => {
    try {
        const { id } = req.params;
        const ars = await ARS.findById(id);
        if (!ars) {
            return res.status(404).json({ message: "ARS no encontrado", status: 404 });
        }
        res.status(200).json({ message: "ARS obtenido correctamente", status: 200, data: ars });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Actualizar un ARS por ID
const updateARS = async (req, res) => {
    try {
        const { id } = req.params;
        const { arsName, rnc, status } = req.body;
        const updatedARS = await ARS.findByIdAndUpdate(id, { arsName, rnc, status }, { new: true });
        if (!updatedARS) {
            return res.status(404).json({ message: "ARS no encontrado", status: 404 });
        }
        res.status(200).json({ message: "ARS actualizado correctamente", status: 200, data: updatedARS });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Eliminar un ARS por ID
const deleteARS = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedARS = await ARS.findByIdAndDelete(id);
        if (!deletedARS) {
            return res.status(404).json({ message: "ARS no encontrado", status: 404 });
        }
        res.status(200).json({ message: "ARS eliminado correctamente", status: 200 });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

module.exports = {
    createARS,
    getAllARS,
    getARSById,
    updateARS,
    deleteARS
};
