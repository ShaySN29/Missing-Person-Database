/* Model below created using the model() method. The model handles the creation and retrieval of missing persons to and from the database */
const mongoose = require("mongoose");

const MPSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    lastSeen: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    identifyingFeatures: {
        type: String,
        required: true
    }
});

// The Name of the model and the schema object created passed as arguments
module.exports = mongoose.model('MP', MPSchema);