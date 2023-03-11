const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  prefferedName: {
    type: String,
  },
  genderName: {
    type: String,
    required: [true, "Please enter self-identified gender for the employee"],
  enum: ['He/Him', 'She/Her', 'They/Them'],
  },
  birthday: {
    type: Date,
    required: [true, "Birthday is required"],
  },
  personalEmail: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  cellPhone: {
    type: Number,
    required: [true, "Phone number is required"],
  },
  businessTitle: {
    type: String,
    required: [true, "Business title is required"],
    enum: ['Employee', 'Manager'],
  },
  workEmail: {
    type: String,
    required: [true, "EDs email is required"]
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
    required: [true, "Please indicate employement activity"]
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
