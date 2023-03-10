// const mongoose = require('mongoose')

// const ShiftSchema = new mongoose.Schema({
//     shiftPeriod: {
//         type: String,
//         enum: ['Morning', 'Evening'],
//         required: [true, 'Please select the shift period.'],
//     },
//     date: {
//         type: Date,
//         required: [true, 'Please provide the shift date.'],
//     },
//     employees: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Employee',
//         required: [true, 'Please provide at least one employee.'],
//     }],
//     pic: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Employee',
//         required: [true, 'Please provide the person in charge.'],
//     }
// }, {
//     timestamps: true
// });

// const Shift = mongoose.model('Shift', ShiftSchema);

// module.exports = Shift;