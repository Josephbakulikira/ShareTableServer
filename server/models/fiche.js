const mongoose = require("mongoose")

const FicheSchema = mongoose.Schema({
    description: {type: String, required: true},
    office: {type: String, required: true},
    solution: {type: String, required: true},
    observation: {type: String, required: true},
    amount: {type: Number, required: true},
    division: {type: String , required: true},
    name: {type: String, required: true},
    userid: {type: String, required: true}
}, {timestamps: true});

const FicheModal = mongoose.model("files", FicheSchema);

module.exports = FicheModal;