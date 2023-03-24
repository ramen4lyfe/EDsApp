const Booking = require('../models/booking.model');
const Employee  = require('../models/employee.model');

// GET all bookings
const getAllBookings = async (req, res) => {
try {
    const bookings = await Booking.find().populate('employee');
    res.json(bookings);
} catch (err) {
    res.status(500).json({ message: err.message });
}
};

// GET a specific booking by ID
const getBookingById = async (req, res) => {
try {
    const booking = await Booking.findById(req.params.id).populate('employee');
    if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
} catch (err) {
    res.status(500).json({ message: err.message });
}
};

// CREATE a new booking
const createBooking = async (req, res) => {
    const {
        employeeId,
        shiftId,
        notes
    } = req.body;
    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(400).json({
                message: 'Invalid employee ID'
            });
        }console.log("employeeId:", employeeId);
console.log("employee:", employee);

        const booking = new Booking({
            employee: employeeId,
            shift: shiftId,
            notes: notes,
        });

        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};


// UPDATE an existing booking by ID
const updateBooking = async (req, res) => {
try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.body.employeeId) {
    const employee = await Employee.findById(req.body.employeeId);
    if (!employee) {
        return res.status(400).json({ message: 'Invalid employee ID' });
    }
    booking.employee = req.body.employeeId;
    }

    if (req.body.shiftId) {
    booking.shift = req.body.shiftId;
    }

    if (req.body.notes) {
    booking.notes = req.body.notes;
    }

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
} catch (err) {
    res.status(400).json({ message: err.message });
}
};

// DELETE a booking by ID
const deleteBooking = async (req, res) => {
try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.remove();
    res.json({ message: 'Booking deleted' });
} catch (err) {
    res.status(500).json({ message: err.message });
}
};

module.exports = { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking };
