const Booking = require("../models/booking.model");
const Shift = require("../models/shift.model");
const Employee = require("../models/employee.model");

// Create and save a new booking
const createBooking = async (req, res) => {
    try {
        const {
            gameName,
            time,
            numberOfPeople,
            shift,
            host,
            gameMaster,
            notes
        } = req.body;

        const newBooking = new Booking({
            gameName,
            time,
            numberOfPeople,
            shift,
            host,
            gameMaster,
            notes,
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Retrieve all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("shift host gameMaster");
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Find a single booking by ID
const getBookingById = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId).populate("shift host gameMaster");

        if (!booking) {
            res.status(404).json({
                message: "Booking not found"
            });
        } else {
            res.status(200).json(booking);
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Update a booking by ID
const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, req.body, {
            new: true,
            runValidators: true
        }).populate("shift host gameMaster");

        if (!updatedBooking) {
            res.status(404).json({
                message: "Booking not found"
            });
        } else {
            res.status(200).json(updatedBooking);
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Delete a booking by ID
const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            res.status(404).json({
                message: "Booking not found"
            });
        } else {
            res.status(200).json({
                message: "Booking deleted successfully",
                data: deletedBooking
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking
};
