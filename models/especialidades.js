const mongoose = require('mongoose');

const SpecialitysSchema = new mongoose.Schema({
        specialityName: String,
        status: {
            type: Boolean,
            default: true
        }
    },

    {
        collection: 'specialitys',
        timestamps: true
    }

)

const model = mongoose.model('SpecialitysSchema', SpecialitysSchema);
module.exports = model;