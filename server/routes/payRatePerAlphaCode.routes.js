const express = require('express');
const router = express.Router();

const PayRatePerAlphaCodeController = require('../controllers/payRatePerAlphaCode.controller');

module.exports = (app) => {
    app.get('/api/payRatePerAlphaCodes', PayRatePerAlphaCodeController.getPayRatePerAlphaCodes);
    app.get('/api/payRatePerAlphaCodes/:id', PayRatePerAlphaCodeController.findOnePayRatePerAlphaCode);
    app.post('/api/payRatePerAlphaCodes', PayRatePerAlphaCodeController.createPayRatePerAlphaCode); 
    app.put('/api/payRatePerAlphaCodes/update/:id', PayRatePerAlphaCodeController.updatePayRatePerAlphaCode);
    app.delete('/api/payRatePerAlphaCodes/delete/:id', PayRatePerAlphaCodeController.deletePayRatePerAlphaCode);    
};
