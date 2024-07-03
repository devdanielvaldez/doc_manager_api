const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
        stateId: String,
        code: String,
        phone: String,
        speciality: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SpecialitysSchema"
        },
        profileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProfileSchema"
        }
    },

    {
        collection: 'doctor',
        timestamps: true
    }

)

const model = mongoose.model('DoctorSchema', DoctorSchema);
module.exports = model;