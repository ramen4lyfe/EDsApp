const mongoose = require("mongoose");

const alphaCodeSchema = new mongoose.Schema({
    alphaCode: {
        type: String,
        required: [true],
        unique: true,
    },
    description: {
        type: String,
        required: [true],
    },
    payRate: {
        type: Number,
        required: [true],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const AlphaCode = mongoose.model("AlphaCode", alphaCodeSchema);
module.exports = AlphaCode;