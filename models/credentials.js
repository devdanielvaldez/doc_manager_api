const mongoose = require('mongoose');

const CredentialsSchema = new mongoose.Schema({
        username: String,
        pwd: String,
        firstLogin: {
            type: Boolean,
            default: false
        },
        rol: {
            type: String,
            enum: ['ADMIN', 'DOCTOR']
        },
        lastLogin: String,
        profileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProfileSchema'
        }
    },

    {
        collection: 'credentials',
        timestamps: true
    }

)

const model = mongoose.model('CredentialsSchema', CredentialsSchema);
module.exports = model;