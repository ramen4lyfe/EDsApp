// const { Employee } = require("../models/employee.model");
const { Employee, Booking, Shift } = require("../models/edscheduling.model")


const createEmployee = (req, res) => {
    const {body} = req;
    console.log(body);
    Employee.create(req.body)
        .then((newEmployee) => {
            res.json({ newEmployee });
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};
const getAllEmployees = (req, res) => {
    Employee.find()
        .then((allEmployees) => {
            res.json(allEmployees);
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};
const getEmployeeById = (req, res) => {
    Employee.findOne({_id: req.params.id})
    .then((oneEmployee) => {
        res.json(oneEmployee);
    })
    .catch((err) => {
        res.status(400).json({error: err });
    });
};

const updateEmployee = (req, res) => {
    Employee.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true,})
        .then((updatedEmployee) => {
            res.json({ updatedEmployee });
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};
const deleteEmployee = (req, res) => {
    Employee.deleteOne({_id: req.params.id})
        .then((deletedEmployee) => {
            res.json({ deletedEmployee });
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};

// ---------
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
  const employee = await Employee.findById(req.body.employeeId);
  if (!employee) {
    return res.status(400).json({ message: 'Invalid employee ID' });
  }

  const booking = new Booking({
    employee: req.body.employeeId,
    shift: req.body.shiftId,
    notes: req.body.notes,
  });

  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
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

//-----------
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

module.exports = {
    createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee,
    getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking,
    getAllShifts, getShiftById, createShift, updateShift, deleteShift
};