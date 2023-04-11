const express = require('express');
const router = express.Router();

const alphaCodeController = require('../controllers/alphaCode.controller');

module.exports = (app) => {
    app.get('/api/alphaCodes', alphaCodeController.getAllAlphaCodes);
    app.get('/api/alphaCodes/:id', alphaCodeController.getAlphaCodeById);
    app.post('/api/alphaCodes', alphaCodeController.createAlphaCode); 
    app.put('/api/alphaCodes/update/:id', alphaCodeController.updateAlphaCodeById);
    app.delete('/api/alphaCodes/delete/:id', alphaCodeController.deleteAlphaCodeById);    
};