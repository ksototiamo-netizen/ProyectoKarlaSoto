const express = require('express');
const cors = require('cors');
const travelersRoutes = require('./routes/travelers.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/travelers', travelersRoutes);

module.exports = app;
