const Shift = require('../models/shift.model');

// GET all shifts
const getAllShifts = async (req, res) => {
    try {
        const shifts = await Shift.find()
            .populate('dayShift')
            .populate('eveningShift')
            .populate('dayShiftPic')
            .populate('eveningShiftPic');
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
    const {
        date,
        dayShift,
        eveningShift
    } = req.body;

    const shift = new Shift({
        date,
        dayShift,
        eveningShift
    });

    try {
        const newShift = await shift.save();
        await newShift.populate('dayShift.pic dayShift.employees eveningShift.pic eveningShift.employees').execPopulate();
        res.status(201).json(newShift);
    } catch (err) {
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
        await updatedShift.populate('dayShift.pic dayShift.employees eveningShift.pic eveningShift.employees').execPopulate();
        res.json(updatedShift);
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
