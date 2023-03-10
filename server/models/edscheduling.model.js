const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
            match: [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required'],
    },
        birthday: {
        type: Date,
        required: [true, 'Birthday is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const ShiftSchema = new mongoose.Schema({
    shiftPeriod: {
        type: String,
        enum: ['Morning', 'Evening'],
        required: [true, 'Please select the shift period.'],
    },
    date: {
        type: Date,
        required: [true, 'Please provide the shift date.'],
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'Please provide at least one employee.'],
    }],
    pic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'Please provide the person in charge.'],
    }
}, {
    timestamps: true
});

const BookingSchema = new mongoose.Schema({
    gameName: {
    type: String,
    required: true
    },
    time: {
    type: Date,
    required: true
    },
    numberOfPeople: {
    type: Number,
    required: true
    },
    shift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift'
    },
    host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
    },
    gameMaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
    },
});

const Employee = mongoose.model('Employee', EmployeeSchema);
const Shift = mongoose.model('Shift', ShiftSchema);
const Booking = mongoose.model('Booking', BookingSchema);

module.exports = { Employee, Shift, Booking };
