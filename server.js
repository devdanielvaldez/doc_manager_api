const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use('/api', require('./routers/index.routes'));
require('./database/connection')();

app.listen(5000, (req, res) => {
    console.log('Server up at port 5000');
})

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));