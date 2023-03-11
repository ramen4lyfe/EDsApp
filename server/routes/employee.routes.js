// const employeeController = require('../controllers/employee.controller');

// module.exports = (app) => {
//     // Employee routes
//     app.get('/api/employees', employeeController.getAllEmployees);
//     app.get('/api/employees/:id', employeeController.getEmployeeById);
//     app.post('/api/employees',employeeController.createEmployee);
//     app.patch('/api/employees/:id', employeeController.updateEmployee);
//     app.delete('/api/employees/:id', employeeController.deleteEmployee)
// }

const express = require('express');
const { Employee } = require('../models/employee.model');

const router = express.Router();

// Get all employees
router.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single employee by ID
router.get('/api/employees/:id', getEmployee, (req, res) => {
  res.json(res.employee);
});

// Create a new employee
router.post('/api/employees', async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    birthday: req.body.birthday
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing employee by ID
router.patch('/api/employees/:id', getEmployee, async (req, res) => {
  if (req.body.name != null) {
    res.employee.name = req.body.name;
  }
  if (req.body.email != null) {
    res.employee.email = req.body.email;
  }
  if (req.body.phone != null) {
    res.employee.phone = req.body.phone;
  }
  if (req.body.birthday != null) {
    res.employee.birthday = req.body.birthday;
  }

  try {
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an employee by ID
router.delete('/api/employees/:id', getEmployee, async (req, res) => {
  try {
    await res.employee.remove();
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get an employee by ID
async function getEmployee(req, res, next) {
  let employee;

  try {
    employee = await Employee.findById(req.params.id);

    if (employee == null) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.employee = employee;
  next();
}

module.exports = router;
