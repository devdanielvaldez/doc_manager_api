const bcrypt = require("bcryptjs");
const Credentials = require('../models/credentials');
const Profile = require('../models/profile');
const Doctor = require('../models/doctors');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res) => {
    try {
        const {
            name,
            lastName,
            bornDate,
            email,
            pwd,
            rol
        } = req.body;

        const hashPass = await bcrypt.hash(pwd, 10);

            const ProfileRegister = await Profile({
                name,
                lastName,
                bornDate,
                email
            });

            ProfileRegister.save();

        const CredentialsRegister = await Credentials({
            username: email,
            pwd: hashPass,
            rol,
            profileId: ProfileRegister._id
        });

        CredentialsRegister.save();

        res
        .status(200)
        .json({ msg: "Usuario creado correctamente", status: 200 });

    } catch(err) {
        return res.status(500).json({
            ok: false,
            message: "Error inesperado",
            error: err
          })      
    }
}

const registerDoctor = async(req, res) => {
    try {
        const {
            name,
            lastName,
            bornDate,
            email,
            pwd,
            stateId,
            code,
            phone,
            speciality
        } = req.body;

        // Hash the password
        const hashPass = await bcrypt.hash(pwd, 10);

        // Create the Profile
        const ProfileRegister = new Profile({
            name,
            lastName,
            bornDate,
            email
        });

        await ProfileRegister.save();

        // Create the Credentials
        const CredentialsRegister = new Credentials({
            username: email,
            pwd: hashPass,
            rol: "DOCTOR",
            profileId: ProfileRegister._id
        });

        await CredentialsRegister.save();

        // Create the Doctor record
        const DoctorRegister = new Doctor({
            stateId,
            code,
            phone,
            speciality,
            profileId: ProfileRegister._id
        });

        await DoctorRegister.save();

        // Return a success response
        res.status(200).json({ msg: "Médico creado correctamente", status: 200 });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            message: "Error inesperado",
            error: err
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, pwd } = req.body;

        // Buscar usuario por email
        const user = await Credentials.findOne({ username: email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: "Usuario o contraseña incorrectos",
                status: 400
            });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(pwd, user.pwd);

        if (!isMatch) {
            return res.status(400).json({
                ok: false,
                message: "Usuario o contraseña incorrectos",
                status: 400
            });
        }

        // Generar token JWT
        const token = jwt.sign(
            { userId: user._id, username: user.username, rol: user.rol },
            'doc_register_valid_api_key',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            ok: true,
            message: "Login exitoso",
            token,
            status: 200
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            message: "Error inesperado",
            error: err
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    registerDoctor
}