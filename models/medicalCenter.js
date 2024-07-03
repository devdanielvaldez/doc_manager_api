const mongoose = require('mongoose');

const MedicalCenterSchema = new mongoose.Schema({
        centerName: String,
        status: {
            type: Boolean,
            default: true
        }
    },

    {
        collection: 'medicalCenter',
        timestamps: true
    }

)

const model = mongoose.model('MedicalCenterSchema', MedicalCenterSchema);
module.exports = model;