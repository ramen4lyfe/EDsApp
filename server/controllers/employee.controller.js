const Employee = require("../models/employee.model");

const createEmployee = (req, res) => {
    const {body} = req;
    console.log(body);
    Patient.create(req.body)
        .then((newEmployee) => {
            res.json({ newEmployee });
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};
const getAllEmployees = (req, res) => {
    Patient.find()
        .then((allEmployees) => {
            res.json(allEmployees);
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};
const getEmployeeById = (req, res) => {
    Patient.findOne({_id: req.params.id})
    .then((oneEmployee) => {
        res.json(oneEmployee);
    })
    .catch((err) => {
        res.status(400).json({error: err });
    });
};

// const addToList = (req, res) => {
//     Patient.findOne({_id: req.params.id})
//     .then((onePatient) => {
//         res.json(onePatient);
//     })
//     .catch((err) => {
//         res.status(400).json({error: err });
//     });
// };

// const getOneByName = (req, res) => {
//     Patient.findOne({firstName: req.params.firstName})
//     .then((onePatientByName) => {
//         res.json(onePatientByName);
//         console.log(onePatientByName)
//     })
//     .catch((err) => {
//         res.status(400).json({error: err });
//     });
// };

const updateEmployee = (req, res) => {
    Patient.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true,})
        .then((updatedEmployee) => {
            res.json({ updatedEmployee });
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};
const deleteEmployee = (req, res) => {
    Patient.deleteOne({_id: req.params.id})
        .then((deletedEmployee) => {
            res.json({ deletedEmployee });
        })
        .catch((err) => {
            res.status(400).json({error: err });
        });
};

module.exports = {createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee};