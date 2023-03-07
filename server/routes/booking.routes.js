const bookingController = require('../controllers/booking.controller');

module.exports = (app) => {
  // Booking routes
    app.get('/api/bookings', bookingController.getAllBookings);
    app.get('/api/bookings/:id', bookingController.getBookingById);
    app.post('/api/bookings', bookingController.createBooking);
    app.patch('/api/bookings/:id', bookingController.updateBooking);
    app.delete('/api/bookings/:id', bookingController.deleteBooking);
};
