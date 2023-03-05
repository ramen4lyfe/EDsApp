const { Shift, Employee } = require('../models/edscheduling.model');

// GET all shifts
const getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find().populate('employees');
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a specific shift by ID
const getShiftById = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id).populate('employees');
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }
    res.json(shift);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a new shift
const createShift = async (req, res) => {
  const employeeIds = req.body.employees;
  const employees = await Employee.find({ _id: { $in: employeeIds } });
  if (employees.length !== employeeIds.length) {
    return res.status(400).json({ message: 'Invalid employee IDs' });
  }

  const shift = new Shift({
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    employees: employeeIds,
  });

  try {
    const newShift = await shift.save();
    res.status(201).json(newShift);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE an existing shift by ID
const updateShift = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }

    if (req.body.date) {
      shift.date = req.body.date;
    }

    if (req.body.startTime) {
      shift.startTime = req.body.startTime;
    }

    if (req.body.endTime) {
      shift.endTime = req.body.endTime;
    }

    if (req.body.employees) {
      const employeeIds = req.body.employees;
      const employees = await Employee.find({ _id: { $in: employeeIds } });
      if (employees.length !== employeeIds.length) {
        return res.status(400).json({ message: 'Invalid employee IDs' });
      }
      shift.employees = employeeIds;
    }

    const updatedShift = await shift.save();
    res.json(updatedShift);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a shift by ID
const deleteShift = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }

    await shift.remove();
    res.json({ message: 'Shift deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllShifts, getShiftById, createShift, updateShift, deleteShift };
