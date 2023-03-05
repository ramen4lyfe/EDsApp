const { Employee } = require('../models/edscheduling.model');

// GET all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a specific employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a new employee
const createEmployee = async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE an existing employee by ID
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (req.body.name) {
      employee.name = req.body.name;
    }

    if (req.body.position) {
      employee.position = req.body.position;
    }

    if (req.body.department) {
      employee.department = req.body.department;
    }

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an employee by ID
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.remove();
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee };
