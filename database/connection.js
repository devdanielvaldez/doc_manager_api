const mongoose = require('mongoose');
const { config } = require('dotenv');
config();

const Connect = async() => {
    try {
        const con = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Database Connect: ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = Connect;