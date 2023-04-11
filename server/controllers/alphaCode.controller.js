const AlphaCode = require("../models/alphaCode.model");
const mongoose = require("mongoose");

// Create and save a new alphaCode
const createAlphaCode = async (req, res) => {
    try {
        const {
            alphaCode,
            payRate,
        } = req.body;

        const newAlphaCode = new AlphaCode({
            alphaCode,
            payRate,
        });

        const savedAlphaCode = await newAlphaCode.save();
        res.json(savedAlphaCode);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

// Retrieve all alphaCodes
const getAllAlphaCodes = async (req, res) => {
    try {
        const alphaCodes = await AlphaCode.find();
        res.json(alphaCodes);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

// Retrieve a single alphaCode with id
const getAlphaCodeById = async (req, res) => {
    try {
        const alphaCode = await AlphaCode.findById(req.params.id);
        res.json(alphaCode);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

// Update a alphaCode with id
const updateAlphaCodeById = async (req, res) => { 
    try {
        const alphaCode = await AlphaCode.findById(req.params.id);
        if (alphaCode) {
            alphaCode.alphaCode = req.body.alphaCode;
            alphaCode.payRate = req.body.payRate;
            const updatedAlphaCode = await alphaCode.save();
            res.json(updatedAlphaCode);
        } else {
            res.status(404).json({
                message: "AlphaCode not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

// Delete a alphaCode with id
const deleteAlphaCodeById = async (req, res) => {
    try {
        const alphaCode = await AlphaCode.findById(req.params.id);
        if (alphaCode) {
            await alphaCode.remove();
            res.json({
                message: "AlphaCode removed"
            });
        } else {
            res.status(404).json({
                message: "AlphaCode not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = { createAlphaCode, getAllAlphaCodes, getAlphaCodeById, updateAlphaCodeById, deleteAlphaCodeById };