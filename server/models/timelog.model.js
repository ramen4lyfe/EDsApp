const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const timeLogSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeIn: {
        type: String,
        required: true
    },
    timeOut: {
        type: String,
        required: true
    },
    alphaCode: {
        type: String,
        required: true
    },
    totalHours: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const TimeLog = mongoose.model("TimeLog", timeLogSchema);

module.exports = TimeLog;
