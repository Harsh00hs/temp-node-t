const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true, default: 0 },
        banquet_id: { type: Number, required: true }
    },
    {
        timestamps: true
    }
)

const package_db = mongoose.model("Packages", schema)

module.exports = package_db