const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  shift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  gameMaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  notes: {
    type: String,
    required: true
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
