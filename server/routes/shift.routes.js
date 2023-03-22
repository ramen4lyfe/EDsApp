const shiftController = require('../controllers/shift.controller');
module.exports = (app) => {
  // Shift routes
    app.get('/api/shifts', shiftController.getAllShifts);
    app.get('/api/shifts/:id', shiftController.getShiftById);
    app.post('/api/shifts', shiftController.createShift);
    app.put('/api/shifts/update/:id', shiftController.updateShift);
    app.delete('/api/shifts/delete/:id', shiftController.deleteShift);
};