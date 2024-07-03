const mongoose = require('mongoose');
const { Types } = require('mongoose');

const InvocesSchema = new mongoose.Schema({
        profile: {
            type: Types.ObjectId,
            ref: "ProfileSchema"
        },
        doctor: {
            type: Types.ObjectId,
            ref: "DoctorSchema"
        },
        medicalCenter: {
            type: Types.ObjectId,
            ref: "MedicalCenterSchema"
        },
        nfc: {
            type: Types.ObjectId,
            ref: "NCFSchema"
        },
        ars: {
            type: Types.ObjectId,
            ref: "ARSSchema"
        },
        invoceDate: String,
        invoceFinal: String,
        services: [Object],
        totalAmount: String,
        invoceStatus: {
            type: String,
            enum: ['PAY', 'PENDING'],
            default: 'PENDING'
        },
        invoiceSrc: String
    },

    {
        collection: 'invoces',
        timestamps: true
    }

)

const model = mongoose.model('InvocesSchema', InvocesSchema);
module.exports = model;