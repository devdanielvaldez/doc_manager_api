const NCF = require('../models/ncf');

// Crear un nuevo NCF
const createNCF = async (req, res) => {
    try {
        const { ncf, state, profileId } = req.body;
        const newNCF = new NCF({ ncf, state, profileId });
        await newNCF.save();
        res.status(201).json({ message: "NCF creado correctamente", status: 201, data: newNCF });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Obtener todos los NCFs
const getAllNCFs = async (req, res) => {
    try {
        const ncfList = await NCF.find().populate('profileId');
        res.status(200).json({ message: "Lista de NCFs obtenida correctamente", status: 200, data: ncfList });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Obtener un NCF por ID
const getNCFById = async (req, res) => {
    try {
        const { id } = req.params;
        const ncf = await NCF.findById(id).populate('profileId');
        if (!ncf) {
            return res.status(404).json({ message: "NCF no encontrado", status: 404 });
        }
        res.status(200).json({ message: "NCF obtenido correctamente", status: 200, data: ncf });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

const getNCFsByProfileId = async (req, res) => {
    try {
        const { profileId } = req.params;
        const ncfList = await NCF.find({ profileId }).populate('profileId');
        res.status(200).json({ message: "Lista de NCFs obtenida correctamente", status: 200, data: ncfList });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Actualizar un NCF por ID
const updateNCF = async (req, res) => {
    try {
        const { id } = req.params;
        const { ncf, state, profileId } = req.body;
        const updatedNCF = await NCF.findByIdAndUpdate(id, { ncf, state, profileId }, { new: true });
        if (!updatedNCF) {
            return res.status(404).json({ message: "NCF no encontrado", status: 404 });
        }
        res.status(200).json({ message: "NCF actualizado correctamente", status: 200, data: updatedNCF });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Eliminar un NCF por ID
const deleteNCF = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNCF = await NCF.findByIdAndDelete(id);
        if (!deletedNCF) {
            return res.status(404).json({ message: "NCF no encontrado", status: 404 });
        }
        res.status(200).json({ message: "NCF eliminado correctamente", status: 200 });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

module.exports = {
    createNCF,
    getAllNCFs,
    getNCFById,
    updateNCF,
    deleteNCF,
    getNCFsByProfileId
};