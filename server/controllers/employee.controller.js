const Employee = require("../models/employee.model");


const createEmployee = (req, res) => {
    const {body} = req;
    console.log(body);
    Employee.create(req.body)
        .then((newEmployee) => {
            res.json({ newEmployee });
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};
const getAllEmployees = (req, res) => {
    Employee.find()
        .then((allEmployees) => {
            res.json(allEmployees);
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};
const getEmployeeById = (req, res) => {
    Employee.findOne({_id: req.params.id})
    .then((oneEmployee) => {
        res.json(oneEmployee);
    })
    .catch((err) => {
        res.status(400).json({error: err });
    });
};

const updateEmployee = (req, res) => {
    Employee.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true,})
        .then((updatedEmployee) => {
            res.json({ updatedEmployee });
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};
const deleteEmployee = (req, res) => {
    Employee.deleteOne({_id: req.params.id})
        .then((deletedEmployee) => {
            res.json({ deletedEmployee });
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};

module.exports = {createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee};