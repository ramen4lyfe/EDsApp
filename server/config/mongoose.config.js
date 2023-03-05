const mongoose = require("mongoose");
const { Employee, Shift, Booking } = require('../models/edscheduling.model');

mongoose.connect(`mongodb://localhost/EDscheduling`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log(`Connected to EDscheduling database!`))
    .catch((err) => console.log(err));

module.exports = { Employee, Shift, Booking };


// const EmployeeSchema = new mongoose.Schema({
//     name: String,
//     position: String,
//     department: String,
// });

// const ShiftSchema = new mongoose.Schema({
//     date: Date,
//     startTime: Date,
//     endTime: Date,
//     employees: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Employee'
//     }],
// });

// const BookingSchema = new mongoose.Schema({
//     date: Date,
//     shift: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Shift'
//     },
//     employee: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Employee'
//     },
// });

// const Employee = mongoose.model('Employee', EmployeeSchema);
// const Shift = mongoose.model('Shift', ShiftSchema);
// const Booking = mongoose.model('Booking', BookingSchema);

// module.exports = { Employee, Shift, Booking };
