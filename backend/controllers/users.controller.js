/* Controller contains the code to perform CRUD operations using Mongoose. */
User = require('../models/users.model');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const secretKey = 'MySecretKey125478jjhgeDE';

// addNewUser function below adds a user to the collection using the save() method
exports.addNewUser = (req, res) => {
    let userTemplate = new User({
        username: req.body.username,
        password: req.body.password,
        admin: false
    });

    userTemplate.save( (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "There was an error while adding the new user" })
        } else {
            console.log(data);
            res.json("The new user has been added");
        }
    });
};

/* When the user enters the login details, the find method checks if the username is in the database
 if the username entered is equal to the username in the database, a jwt is generated and the token is sent as the response
 */
 exports.loginUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    User.find({ username: username }, (error, user) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Some error occurred." });
        } else {

            if (username === user[0].username && password == user[0].password) { 
                const payload = {
                    'username': user[0].username,
                    'admin': user[0].admin
                };
                const token = jwt.sign(JSON.stringify(payload), secretKey,
                    {algorithm: 'HS256'});
                res.send( {'token': token} );
            } else {
                res.status(403).send( {'err': 'Incorrect login!'} );
            }
        }
    })
};

// Verifying the token
exports.resourceEndpoint = (req, res) => {
    const auth = req.headers['authorization']
    const token = auth.split(' ')[1]
    try {
        const decoded = jwt.verify(token, secretKey)
        res.send({
            'msg':
                `Hello, ${decoded.username}! Your JSON Web Token has been verified.`
        })
    } catch (err) {
        res.status(401).send({ 'err': 'Bad JWT!' })
    }
};

// The following are functions that the admin can perform on other users

// Deleting a user using the findOneAndRemove method
exports.deleteUser = (req, res) => {
    let query = { _id: req.body._id };

    User.findOneAndRemove(query, (error) => {
        if (error) {
            console.log("ERROR: The user could not be removed." + error);
            res.json("ERROR: The user is NOT removed. " + error);
        }
        res.json("The user was successfully removed");
    });
};

// Updating a user (the admin can allow other users to be admin) using the findOneAndUpdate method
exports.updateUserAdmin = (req, res) => {
    let query = { _id: req.body._id };
    
    User.findOneAndUpdate(query, { $set: { admin: req.body.admin } }, (error, data) => {
        if (error) {
            console.log("The update was unsuccessful.");
            res.json("ERROR: Not Updated. " + error);
        }
        res.json("The user was updated.");
    });
};

// List users to delete or update
exports.listUsers = (req, res) => {
    User.find((error, users) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Some error occurred while retrieving the list of users." });
        } else {
            res.json(users);
        }
    });
};