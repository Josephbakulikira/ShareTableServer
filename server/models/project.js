const mongoose = require("mongoose")

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    rows:{
        type: Array, required: true
    },
    cols: {
        type: Array, required: true
    },
    maximum: {
        type: Number, required: true
    },
    solde: {
        type: Number, required: true
    },
    history: [],
    users: [],
    
},{timestamps: true})

const projectModel  = mongoose.model("projects", projectSchema);

module.exports = projectModel