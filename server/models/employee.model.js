const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
  },
  birthday: {
    type: Date,
    required: [true, "Birthday is required"],
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
