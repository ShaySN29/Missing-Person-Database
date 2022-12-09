/* Controller contains the code to perform CRUD operations using Mongoose. */
MP = require('../models/mp.model');
const mongoose = require("mongoose");

// addNewMP function below adds a new MP to the MP collection using the save() method
exports.addNewMP = (req, res) => {
    let mpTemplate = new MP({
        name: req.body.name,
        age: req.body.age,
        lastSeen: req.body.lastSeen,
        contact: req.body.contact,
        identifyingFeatures: req.body.identifyingFeatures,
    });

    mpTemplate.save( (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "There was an error while adding the Missing Person" })
        } else {
            console.log(data);
            res.json("The Missing Person has been added");
        }
    });
};

// Function below updates the MP using the findOneAndUpdate method
exports.updateMissingPerson = (req, res) => {
    let query = { _id: req.body._id };
    let updatedMP = {
        name: req.body.name,
        age: req.body.age,
        lastSeen: req.body.lastSeen,
        contact: req.body.contact,
        identifyingFeatures: req.body.identifyingFeatures,
    }
    
    MP.findOneAndUpdate(query, updatedMP, { new: true }, (error, data) => {
        if (error) {
            console.log("The update was unsuccessful.");
            res.json("ERROR: Not Updated. " + error);
        }
        res.json("The data was updated.");
    });
};

// Function below deletes a MP from the list 
exports.deleteMissingPerson = (req, res) => {
        let query = { _id: req.body._id };
    
        MP.findOneAndRemove(query, (error) => {
            if (error) {
                console.log("ERROR: The MP could not be removed." + error);
                res.json("ERROR: The MP is NOT removed. " + error);
            }
            res.json("The MP was successfully removed");
        });
};


// Funcction below retrieves all the MPs from the list using the findAll() method
exports.listMissingPersons = (req, res) => {
    MP.find((error, mps) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Some error occurred while retrieving the list of Missing Persons." });
        } else {
            res.json(mps);
        }
    });
};

/* I wanted to add a search in but realised I was running out of time and it wasn't required
exports.listSearchItems = (req, res) => {
    let query = { name: req.body.name };

    MP.find( query, (error, mps) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Some error occurred while retrieving the list of missing persons." });
        } else {
            res.json(mps);
        }
    });
};
*/