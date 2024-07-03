const mongoose = require('mongoose');

const NCFSchema = new mongoose.Schema({
        ncf:String,
        state: {
            type: String,
            enum: ['ACTIVE', 'USED'],
            default: 'ACTIVE'
        },
        profileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProfileSchema'
        }
    },

    {
        collection: 'ncf',
        timestamps: true
    }

)

const model = mongoose.model('NCFSchema', NCFSchema);
module.exports = model;