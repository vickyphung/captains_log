const mongoose = require("mongoose")

const logSchema = new mongoose.Schema({
    title: {type: String, required: true},
    entry: {type: String, timestamps: true},
    shipIsBroken: {type: Boolean, default: true},
    // comments: {type: String, required: false}
})

const logModel = mongoose.model("Log", logSchema)

module.exports = logModel