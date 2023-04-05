const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true],
  },
  lastName: {
    type: String,
    required: [true],
  },
  preferredName: {
    type: String,
  },
  genderName: {
    type: String,
    required: [true],
    enum: ['He/Him', 'She/Her', 'They/Them'],
},
  birthday: {
    type: Date,
    required: [true],
  },
  email: {
    type: String,
    required: [true],
  },
  cellPhone: {
    type: Number,
    required: [true],
  },
  businessTitle: {
    type: String,
    required: [true],
    enum: ['Employee', 'Manager', 'Stake Holder', 'Owner'],
  },
  payRate:{
    type: Number,
    required: [true],
  },
  hireDate: {
    type: Date,
    required: [true, "Hire date is required"],
  },
  terminationDate: {
    type: Date,
  },
  promotionDate: {
    type: Date,
  },
  isActive:{
    type: Boolean, 
    required: [true],
    // default: true,
  },
  allottedHours: {
    type: Number,
    // required: [true, "Please enter the number of hours the employee is allotted"],
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

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
