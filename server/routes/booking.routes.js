// const bookingController = require('../controllers/booking.controller');

// module.exports = (app) => {
//   // Booking routes
//     app.get('/api/bookings', bookingController.getAllBookings);
//     app.get('/api/bookings/:id', bookingController.getBookingById);
//     app.post('/api/bookings', bookingController.createBooking);
//     app.patch('/api/bookings/:id', bookingController.updateBooking);
//     app.delete('/api/bookings/:id', bookingController.deleteBooking);
// };

const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.model");

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("shift host gameMaster")
      .sort({ time: "asc" });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single booking
router.get("/:id", getBooking, (req, res) => {
  res.json(res.booking);
});

// Update a booking
router.patch("/:id", getBooking, async (req, res) => {
  if (req.body.gameName != null) {
    res.booking.gameName = req.body.gameName;
  }
  if (req.body.time != null) {
    res.booking.time = req.body.time;
  }
  if (req.body.numberOfPeople != null) {
    res.booking.numberOfPeople = req.body.numberOfPeople;
  }
  if (req.body.shift != null) {
    res.booking.shift = req.body.shift;
  }
  if (req.body.host != null) {
    res.booking.host = req.body.host;
  }
  if (req.body.gameMaster != null) {
    res.booking.gameMaster = req.body.gameMaster;
  }

  try {
    const updatedBooking = await res.booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a booking
router.delete("/:id", getBooking, async (req, res) => {
  try {
    await res.booking.remove();
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a booking by ID
async function getBooking(req, res, next) {
  let booking;
  try {
    booking = await Booking.findById(req.params.id).populate(
      "shift host gameMaster"
    );
    if (booking == null) {
      return res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.booking = booking;
  next();
}

module.exports = router;
