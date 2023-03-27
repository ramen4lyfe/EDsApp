const Booking = require("../models/booking.model");
const Shift = require("../models/shift.model");
const Employee = require("../models/employee.model");
const mongoose = require("mongoose");

// Create and save a new booking
const createBooking = async (req, res) => {
    try {
        const {
            gameName,
            datetime,
            numberOfPeople,
            shift,
            host,
            gameMaster,
            notes
        } = req.body;

        const newBooking = new Booking({
            gameName,
            datetime,
            numberOfPeople,
            shift,
            host: mongoose.Types.ObjectId(host),
            gameMaster: mongoose.Types.ObjectId(gameMaster),
            notes
        });

        const savedBooking = await newBooking.save();

        // Populate host and gameMaster fields before sending the response
        const populatedBooking = await Booking.findById(savedBooking._id).populate("shift host gameMaster");

        res.status(201).json(populatedBooking);
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
        const {
            gameName,
            datetime,
            numberOfPeople,
            shift,
            host,
            gameMaster,
            notes
        } = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId, {
                gameName,
                datetime,
                numberOfPeople,
                shift,
                host: mongoose.Types.ObjectId(host),
                gameMaster: mongoose.Types.ObjectId(gameMaster),
                notes
            }, {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBooking) {
            res.status(404).json({
                message: "Booking not found"
            });
        } else {
            // Populate host and gameMaster fields before sending the response
            const populatedBooking = await Booking.findById(updatedBooking._id).populate("shift host gameMaster");
            res.status(200).json(populatedBooking);
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
