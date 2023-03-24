const Booking = require('../models/booking.model');
const Employee = require('../models/employee.model');

// GET all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('shift')
            .populate('host')
            .populate('gameMaster');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// GET a specific booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('shift')
            .populate('host')
            .populate('gameMaster');
        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }
        res.json(booking);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// CREATE a new booking
const createBooking = async (req, res) => {
    const {
        gameName,
        time,
        numberOfPeople,
        shiftId,
        hostId,
        gameMasterId,
        notes,
    } = req.body;
    try {
        const shift = await Shift.findById(shiftId);
        if (!shift) {
            return res.status(400).json({
                message: 'Invalid shift ID'
            });
        }

        const host = await Employee.findById(hostId);
        if (!host) {
            return res.status(400).json({
                message: 'Invalid host ID'
            });
        }

        const gameMaster = await Employee.findById(gameMasterId);
        if (!gameMaster) {
            return res.status(400).json({
                message: 'Invalid game master ID'
            });
        }

        const booking = new Booking({
            gameName,
            time,
            numberOfPeople,
            shift,
            host,
            gameMaster,
            notes,
        });

        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        if (req.body.host) {
            const host = await Employee.findOne({
                _id: req.body.host
            });
            if (!host) {
                return res.status(400).json({
                    message: 'Invalid host ID'
                });
            }
            booking.host = req.body.host;
        }

        if (req.body.gameMaster) {
            const gameMaster = await Employee.findOne({
                _id: req.body.gameMaster
            });
            if (!gameMaster) {
                return res.status(400).json({
                    message: 'Invalid game master ID'
                });
            }
            booking.gameMaster = req.body.gameMaster;
        }

        if (req.body.shift) {
            const shift = await Shift.findOne({
                _id: req.body.shift
            });
            if (!shift) {
                return res.status(400).json({
                    message: 'Invalid shift ID'
                });
            }
            booking.shift = req.body.shift;
        }

        if (req.body.gameName) {
            booking.gameName = req.body.gameName;
        }

        if (req.body.time) {
            booking.time = req.body.time;
        }

        if (req.body.numberOfPeople) {
            booking.numberOfPeople = req.body.numberOfPeople;
        }

        if (req.body.notes) {
            booking.notes = req.body.notes;
        }

        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};


