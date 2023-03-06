const { Employee } = require('../models/edscheduling.model');

// GET all employees
// const getAllEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const getAllEmployees = (req, res) => {
    Employee.find()
        .then((allEmployee) => {
            res.json(allEmployee);
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};

// GET a specific employee by ID
const getEmployeeById = (req, res) => {
  Employee.findOne({_id: req.params.id})
    .then((oneEmployee) => {
        res.json(oneEmployee);
    })
    .catch((err) => {
        res.status(400).json({error: err });
    });
};


const createEmployee = (req, res) => {
    const {body} = req;
    console.log(body);
    Employee.create(req.body)
        .then((newEmployee) => {
            res.json({newEmployee});
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};

// UPDATE an existing employee by ID
// const updateEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     if (req.body.name) {
//       employee.name = req.body.name;
//     }

//     if (req.body.position) {
//       employee.position = req.body.position;
//     }

//     if (req.body.department) {
//       employee.department = req.body.department;
//     }

//     const updatedEmployee = await employee.save();
//     res.json(updatedEmployee);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

const updateEmployee = (req, res) => {
    Employee.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true,})
        .then((updatedEmployee) => {
            res.json({ updatedEmployee });
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};

// DELETE an employee by ID
// const deleteEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     await employee.remove();
//     res.json({ message: 'Employee deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const deleteEmployee = (req, res) => {
    Employee.deleteOne({_id: req.params.id})
        .then((deletedEmployee) => {
            res.json({ deletedEmployee });
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee };
