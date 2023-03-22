const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      // required: [true, "Please provide the owner's name."],
    },
    date: {
      type: Date,
      // required: [true, "Please provide the shift date."],
    },
    dayShift: {
      pic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        // required: [true, "Please provide the day shift PIC."],
      },
      employees: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
          // required: [true, "Please provide at least one employee for day shift."],
        },
      ],
    },
    eveningShift: {
      pic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        // required: [true, "Please provide the evening shift PIC."],
      },
      employees: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
          // required: [true, "Please provide at least one employee for evening shift."],
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Shift = mongoose.model("Shift", ShiftSchema);

module.exports = Shift;
