const Shift = require('../models/shift.model');

// GET all shifts
const getAllShifts = async (req, res) => {
    try {
        const shifts = await Shift.find()
            .populate('dayShift.pic')
            .populate('dayShift.employees')
            .populate('eveningShift.pic')
            .populate('eveningShift.employees');
        res.json(shifts);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


// GET a specific shift by ID
const getShiftById = async (req, res) => {
    try {
        const shift = await Shift.findById(req.params.id).populate('dayShift.pic dayShift.employees eveningShift.pic eveningShift.employees');
        if (!shift) {
            return res.status(404).json({
                message: 'Shift not found'
            });
        }
        res.json(shift);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// CREATE a new shift
const createShift = async (req, res) => {
    // Extract date, dayShift, and eveningShift from the request body
    const {
        date,
        dayShift,
        eveningShift
    } = req.body;

    // Create a new Shift instance using the provided data
    const shift = new Shift({
        date,
        dayShift,
        eveningShift
    });

    try {
        // Save the new shift to the database
        const newShift = await shift.save();

        // Populate the shift object with the related data for dayShift and eveningShift
        // This step retrieves the data for the 'pic' and 'employees' fields in both dayShift and eveningShift
        const populatedShift = await newShift.populate('dayShift.pic dayShift.employees eveningShift.pic eveningShift.employees');

        // Return the populated shift object with a status of 201 (Created)
        res.status(201).json(populatedShift);
    } catch (err) {
        // If there's an error, return a 400 status (Bad Request) with the error message
        res.status(400).json({
            message: err.message
        });
    }
};


// UPDATE an existing shift by ID
const updateShift = async (req, res) => {
    try {
        const shift = await Shift.findById(req.params.id);
        if (!shift) {
            return res.status(404).json({
                message: 'Shift not found'
            });
        }

        if (req.body.date) {
            shift.date = req.body.date;
        }

        if (req.body.dayShift) {
            shift.dayShift = req.body.dayShift;
        }

        if (req.body.eveningShift) {
            shift.eveningShift = req.body.eveningShift;
        }

        const updatedShift = await shift.save();
        const populatedShift = await Shift.findById(updatedShift._id)
            .populate('dayShift.pic')
            .populate('dayShift.employees')
            .populate('eveningShift.pic')
            .populate('eveningShift.employees');

        res.json(populatedShift);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};



// DELETE a shift by ID
const deleteShift = async (req, res) => {
    try {
        const shift = await Shift.findById(req.params.id);
        if (!shift) {
            return res.status(404).json({
                message: 'Shift not found'
            });
        }

        await shift.remove();
        res.json({
            message: 'Shift deleted'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getAllShifts,
    getShiftById,
    createShift,
    updateShift,
    deleteShift
};
