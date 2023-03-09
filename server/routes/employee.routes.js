const employeeController = require('../controllers/employee.controller');

module.exports = (app) => {
    // Employee routes
    app.get('/api/employees', employeeController.getAllEmployees);
    app.get('/api/employees/:id', employeeController.getEmployeeById);
    app.post('/api/employees', (req, res) => {
        console.log('POST request received');
        console.log('Request body:', req.body);
        //code to save the employee data to the database
        res.send('Employee data received and saved');
    });
    app.patch('/api/employees/:id', employeeController.updateEmployee);
    app.delete('/api/employees/:id', employeeController.deleteEmployee)
}