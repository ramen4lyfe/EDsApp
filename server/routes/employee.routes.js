const employeeController = require('../controllers/employee.controller');

module.exports = (app) => {
    // Employee routes
    app.get('/api/employees', employeeController.getAllEmployees);
    app.get('/api/employees/:id', employeeController.getEmployeeById);
    app.post('/api/employees',employeeController.createEmployee);
    app.put('/api/employees/update/:id', employeeController.updateEmployee);
    app.delete('/api/employees/:id', employeeController.deleteEmployee)
};