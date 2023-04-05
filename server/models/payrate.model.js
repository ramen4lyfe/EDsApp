const mongoose = require("mongoose");

const PayRatePerAlphaCodeSchema = new mongoose.Schema({
    alphaCode: {
        type: String,
        required: [true],
        unique: true,
    },
    amount: {
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

const PayRatePerAlphaCode = mongoose.model("PayRatePerAlphaCode", PayRatePerAlphaCodeSchema);
module.exports = PayRatePerAlphaCode;
