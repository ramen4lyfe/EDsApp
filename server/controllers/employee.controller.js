const { Employee } = require('../models/edscheduling.model');

// Get all employees
const getAllEmployees = (req, res) => {
    Employee.find()
        .then((allEmployee) => {
            res.json(allEmployee);
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};

// Get an employee by ID
const getEmployeeById = (req, res) => {
    Employee.findById(req.params.id)
        .then((employee) => {
            res.json(employee);
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};

// Create an employee
const createEmployee = (req, res) => {
    Employee.create(req.body)
        .then((newEmployee) => {
            res.json(newEmployee);
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};

// Update an employee by ID
const updateEmployee = (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .then((updatedEmployee) => {
            res.json(updatedEmployee);
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};

// Delete an employee by ID
const deleteEmployee = (req, res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then((deletedEmployee) => {
            res.json(deletedEmployee);
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee };
