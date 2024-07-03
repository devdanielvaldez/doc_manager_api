const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
        name: String,
        lastName: String,
        bornDate: String,
        email: String
    },

    {
        collection: 'profile',
        timestamps: true
    }

)

const model = mongoose.model('ProfileSchema', ProfileSchema);
module.exports = model;