const bookingController = require('../controllers/booking.controller');
const employeeController = require('../controllers/employee.controller');
const shiftController = require('../controllers/shift.controller');

module.exports = (app) => {
  // Booking routes
    app.get('/api/bookings', bookingController.getAllBookings);
    app.get('/api/bookings/:id', bookingController.getBookingById);
    app.post('/api/bookings', bookingController.createBooking);
    app.patch('/api/bookings/:id', bookingController.updateBooking);
    app.delete('/api/bookings/:id', bookingController.deleteBooking);

  // Employee routes
    app.get('/api/employees', employeeController.getAllEmployees);
    app.get('/api/employees/:id', employeeController.getEmployeeById);
    app.post('/api/employees', employeeController.createEmployee);
    app.patch('/api/employees/:id', employeeController.updateEmployee);
    app.delete('/api/employees/:id', employeeController.deleteEmployee);

  // Shift routes
    app.get('/api/shifts', shiftController.getAllShifts);
    app.get('/api/shifts/:id', shiftController.getShiftById);
    app.post('/api/shifts', shiftController.createShift);
    app.patch('/api/shifts/:id', shiftController.updateShift);
    app.delete('/api/shifts/:id', shiftController.deleteShift);
};
