const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }

},{timestamps: true})

const notificationModel  = mongoose.model("notifications", notificationSchema);

module.exports = notificationModel