// const shiftController = require('../controllers/shift.controller');
// module.exports = (app) => {
//   // Shift routes
//     app.get('/api/shifts', shiftController.getAllShifts);
//     app.get('/api/shifts/:id', shiftController.getShiftById);
//     app.post('/api/shifts', shiftController.createShift);
//     app.patch('/api/shifts/:id', shiftController.updateShift);
//     app.delete('/api/shifts/:id', shiftController.deleteShift);
// };
const express = require("express");
const router = express.Router();
const Shift = require("../models/shift.model");

// Create a new shift
router.post("/", async (req, res) => {
  try {
    const newShift = new Shift(req.body);
    const savedShift = await newShift.save();
    res.status(201).json(savedShift);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all shifts
router.get("/", async (req, res) => {
  try {
    const shifts = await Shift.find().populate("employees pic");
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single shift
router.get("/:id", getShift, (req, res) => {
  res.json(res.shift);
});

// Update a shift
router.patch("/:id", getShift, async (req, res) => {
  if (req.body.shiftPeriod != null) {
    res.shift.shiftPeriod = req.body.shiftPeriod;
  }
  if (req.body.date != null) {
    res.shift.date = req.body.date;
  }
  if (req.body.employees != null) {
    res.shift.employees = req.body.employees;
  }
  if (req.body.pic != null) {
    res.shift.pic = req.body.pic;
  }

  try {
    const updatedShift = await res.shift.save();
    res.json(updatedShift);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a shift
router.delete("/:id", getShift, async (req, res) => {
  try {
    await res.shift.remove();
    res.json({ message: "Shift deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a shift by ID
async function getShift(req, res, next) {
  let shift;
  try {
    shift = await Shift.findById(req.params.id).populate("employees pic");
    if (shift == null) {
      return res.status(404).json({ message: "Shift not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.shift = shift;
  next();
}

module.exports = router;
