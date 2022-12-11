const mongoose = require("mongoose")

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    password: {
        type: String, required: true
    },
    history: [],
    users: [],
    files: [],
},{timestamps: true})

const roomModel  = mongoose.model("rooms", roomSchema);

module.exports = roomModel