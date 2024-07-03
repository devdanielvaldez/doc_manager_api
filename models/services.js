const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
        serviceName: String,
        price: String,
        status: {
            type: Boolean,
            default: true
        }
    },

    {
        collection: 'services',
        timestamps: true
    }

)

const model = mongoose.model('ServicesSchema', ServicesSchema);
module.exports = model;