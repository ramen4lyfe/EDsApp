const TimeLog = require('../models/timelog.model.js');
const Employee = require('../models/employee.model.js');

// Create and save a new time log
exports.createTimeLog = async (req, res) => {
    const {
        employeeId,
        date,
        timeIn,
        timeOut,
        alphaCode,
        totalHours
    } = req.body;

    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        const newTimeLog = new TimeLog({
            employee: employeeId,
            date,
            timeIn,
            timeOut,
            alphaCode,
            totalHours
        });

        const savedTimeLog = await newTimeLog.save();
        res.status(201).json(savedTimeLog);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating time log',
            error
        });
    }
};

exports.getTimeLogs = async (req, res) => {
    try {
        const timeLogs = await TimeLog.find().populate('employee');
        res.status(200).json(timeLogs);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching time logs',
            error
        });
    }
};

exports.getTimeLog = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const timeLog = await TimeLog.findById(id).populate('employee');
        if (!timeLog) {
            return res.status(404).json({
                message: 'Time log not found'
            });
        }
        res.status(200).json(timeLog);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching time log',
            error
        });
    }
};

exports.updateTimeLog = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        employeeId,
        date,
        timeIn,
        timeOut,
        alphaCode,
        totalHours
    } = req.body;

    try {
        const updatedTimeLog = await TimeLog.findByIdAndUpdate(id, {
            employee: employeeId,
            date,
            timeIn,
            timeOut,
            alphaCode,
            totalHours
        }, {
            new: true
        });

        if (!updatedTimeLog) {
            return res.status(404).json({
                message: 'Time log not found'
            });
        }
        res.status(200).json(updatedTimeLog);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating time log',
            error
        });
    }
};

exports.deleteTimeLog = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const deletedTimeLog = await TimeLog.findByIdAndDelete(id);
        if (!deletedTimeLog) {
            return res.status(404).json({
                message: 'Time log not found'
            });
        }
        res.status(200).json({
            message: 'Time log deleted',
            deletedTimeLog
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting time log',
            error
        });
    }
};