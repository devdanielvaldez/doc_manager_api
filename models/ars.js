const mongoose = require('mongoose');

const ARSSchema = new mongoose.Schema({
        arsName: String,
        rnc: String,
        status: {
            type: Boolean,
            default: true
        }
    },

    {
        collection: 'ars',
        timestamps: true
    }

)

const model = mongoose.model('ARSSchema', ARSSchema);
module.exports = model;