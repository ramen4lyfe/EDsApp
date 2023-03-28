const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true],
  },
  time: {
    type: String,
    required: [true],
  },
  gameName: {
    type: String,
    // required: [true, "Game name is required."],
    enum: ['Hostage', 'BOX', 'Nursery']
  },
  numberOfPeople: {
    type: Number,
    required: [true, "Number of people is required."],
    // enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  },
  shift: {
    type: String,
    required: [true, "Shift is required."],
    enum: ['Day', 'Evening']
  },
  // shift: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Shift',
  //   required: [true, "Shift is required."]
  // },
  host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    gameMaster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
  notes: {
    type: String,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
