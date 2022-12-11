const mongoose = require("mongoose")

const PatrimoineSchema = mongoose.Schema({
    localisation: {type: String, required: true},
    localdepart: {type: String, required: true},
    description: {type: String, required: true},
    dimensions: {type: String, required: true},
    etat: {type: String, required: true},
    quantity: {type: String , required: true},
    codebare: {type: String, required: false},
    userid: {type: String, required: true},
    niveau: {type: Number, required: true},
    expirationdate: {type: String, required: true},
}, {timestamps: true});

const PatrimoineModal = mongoose.model("patrimoines", PatrimoineSchema);

module.exports = PatrimoineModal;