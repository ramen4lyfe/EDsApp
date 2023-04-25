const userController = require('../controllers/user.controller');

module.exports = (app) => {
    app.get('/api/user', userController.getAllUsers);
    app.get('/api/user/:id', userController.getUserById);
    app.post('/api/user', userController.createUser);
    app.put('/api/user/:id', userController.updateUserById);
    app.delete('/api/user/:id', userController.deleteUserById);
};