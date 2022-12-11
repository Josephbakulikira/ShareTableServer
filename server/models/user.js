const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, required: true
    },
    status: {
        type: String, required: false
    },
    departement: {
        type: String, required: false
    },
    phonenumber: {
        type: String, default: ""
    },
    title: {
        type: String, default: ""
    }
},{timestamps: true})

const userModel  = mongoose.model("users", userSchema);

module.exports = userModel