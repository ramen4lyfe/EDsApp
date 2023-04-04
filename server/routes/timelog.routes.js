const express = require('express');
const router = express.Router();
const timelogController = require('../controllers/timelog.controller');

// TimeLog routes
module.exports = (app) => {
    app.get('/api/timelogs', timelogController.getTimeLogs);
    app.get('/api/timelogs/:id', timelogController.getTimeLog);
    app.post('/api/timelogs', timelogController.createTimeLog);
    app.put('/api/timelogs/update/:id', timelogController.updateTimeLog);
    app.delete('/api/timelogs/delete/:id', timelogController.deleteTimeLog);
};
