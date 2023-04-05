const PayRatePerAlphaCode = require('../models/payrate.model');

// Create a new pay rate per alpha code
exports.createPayRatePerAlphaCode = async (req, res) => {
    try {
        const payRatePerAlphaCode = new PayRatePerAlphaCode(req.body);
        const result = await payRatePerAlphaCode.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
};

// Retrieve all pay rates per alpha code
exports.getPayRatePerAlphaCodes = async (req, res) => {
    try {
        const payRates = await PayRatePerAlphaCode.find();
        res.status(200).send(payRates);
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

// Retrieve a single pay rate per alpha code by id
exports.findOnePayRatePerAlphaCode = async (req, res) => {
    try {
        const payRatePerAlphaCode = await PayRatePerAlphaCode.findById(req.params.id);
        if (!payRatePerAlphaCode) {
            res.status(404).send({
                message: 'Pay rate per alpha code not found'
            });
        } else {
            res.status(200).send(payRatePerAlphaCode);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

// Update a pay rate per alpha code by id
exports.updatePayRatePerAlphaCode = async (req, res) => {
    try {
        const updatedPayRatePerAlphaCode = await PayRatePerAlphaCode.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updatedPayRatePerAlphaCode) {
            res.status(404).send({
                message: 'Pay rate per alpha code not found'
            });
        } else {
            res.status(200).send(updatedPayRatePerAlphaCode);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

// Delete a pay rate per alpha code by id
exports.deletePayRatePerAlphaCode = async (req, res) => {
    try {
        const deletedPayRatePerAlphaCode = await PayRatePerAlphaCode.findByIdAndRemove(req.params.id);
        if (!deletedPayRatePerAlphaCode) {
            res.status(404).send({
                message: 'Pay rate per alpha code not found'
            });
        } else {
            res.status(200).send({
                message: 'Pay rate per alpha code deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};