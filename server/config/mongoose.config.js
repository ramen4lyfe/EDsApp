const mongoose = require("mongoose");
const { Employee, Shift, Booking } = require('../models/edscheduling.model');

mongoose.connect(`mongodb://localhost/edscheduling`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log(`Connected to EDscheduling database!`))
    .catch((err) => console.log(err));

module.exports = { Employee, Shift, Booking };