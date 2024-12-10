const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        time: { type: String, required: true },
        date: { type: Date, required: true },
        banquet_id: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

const appointment_db = mongoose.model("Appointment", schema)

module.exports = appointment_db