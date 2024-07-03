const Service = require('../models/services');

// Crear un nuevo servicio
const createService = async (req, res) => {
    try {
        const { serviceName, price, status } = req.body;
        const newService = new Service({ serviceName, price, status });
        await newService.save();
        res.status(201).json({ message: "Servicio creado correctamente", status: 201, data: newService });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Obtener todos los servicios
const getAllServices = async (req, res) => {
    try {
        const serviceList = await Service.find();
        res.status(200).json({ message: "Lista de servicios obtenida correctamente", status: 200, data: serviceList });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Obtener un servicio por ID
const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: "Servicio no encontrado", status: 404 });
        }
        res.status(200).json({ message: "Servicio obtenido correctamente", status: 200, data: service });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Actualizar un servicio por ID
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { serviceName, price, status } = req.body;
        const updatedService = await Service.findByIdAndUpdate(id, { serviceName, price, status }, { new: true });
        if (!updatedService) {
            return res.status(404).json({ message: "Servicio no encontrado", status: 404 });
        }
        res.status(200).json({ message: "Servicio actualizado correctamente", status: 200, data: updatedService });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

// Eliminar un servicio por ID
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ message: "Servicio no encontrado", status: 404 });
        }
        res.status(200).json({ message: "Servicio eliminado correctamente", status: 200 });
    } catch (err) {
        res.status(500).json({ message: "Error inesperado", error: err });
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
};
