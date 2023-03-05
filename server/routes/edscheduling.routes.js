const express = require('express');
const bookingController = require('../controllers/booking.controller');
const employeeController = require('../controllers/employee.controller');
const shiftController = require('../controllers/shift.controller');

const app = express();

// Booking routes
app.get('/bookings', bookingController.getAllBookings);
app.get('/bookings/:id', bookingController.getBookingById);
app.post('/bookings', bookingController.createBooking);
app.patch('/bookings/:id', bookingController.updateBooking);
app.delete('/bookings/:id', bookingController.deleteBooking);

// Employee routes
app.get('/employees', employeeController.getAllEmployees);
app.get('/employees/:id', employeeController.getEmployeeById);
app.post('/employees', employeeController.createEmployee);
app.patch('/employees/:id', employeeController.updateEmployee);
app.delete('/employees/:id', employeeController.deleteEmployee);

// Shift routes
app.get('/shifts', shiftController.getAllShifts);
app.get('/shifts/:id', shiftController.getShiftById);
app.post('/shifts', shiftController.createShift);
app.patch('/shifts/:id', shiftController.updateShift);
app.delete('/shifts/:id', shiftController.deleteShift);

module.exports = app;
