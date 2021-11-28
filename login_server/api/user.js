const express = require('express');
const router = express.Router();

//mongodb user model
const User = require('./../models/user');

//Password handler
const bcrypt = require('bcrypt');

//Signup
router.post('/signup', (req, res) => {
    let { name, email, password, dateOfBirth } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if (name == "" || email == "" || password == "" || dateOfBirth == "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        })
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        })
    } else if (!new Date(dateOfBirth).getTime()) {
        res.json({
            status: "FAILED",
            message: "Invalid birth date entered"
        })
    } else if (password.length < 8) {
        res.json({
            status: "FAILED",
            message: "Password is too short!"
        })
    } else { //??
        // Check if use is already existing
        User.find({email}).then(result => {
            if (result.length) {
                //A user already exist
                res.json({
                    status: "FAILED",
                    message: "User with the provided email alrady exist!"
                })
            } else { 
                //Try to create a new user

                // password handling
                const saltRounds = 10
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        dateOfBirth
                    })

                    newUser.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "Signup successful",
                            data: result,
                        })
                    })
                        .catch(err => {
                            res.json({
                                status: "FAILED",
                                message: "An error has occured while saving user account!"
                            })
                        })
                })
                    .catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error has occured while hashing password!"
                        })
                    })
            }
        }).catch(err => {
            console.log(err)
            res.json({
                status: "FAILED",
                message: "An error occured while checking for existing user!"
            })
        })
    }
})

//Signin
router.post('/signin', (req, res) => {
    let { email, password} = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == ""){
        res.json({
            status: "FAILED",
            message: "Empty credentials supplied"
        }) 
    } else {
        //Check if user exist
        User.find({email})
        .then(data => {
            if (data.length) {
                //User exists

                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if (result) {
                        //Password match
                        res.json({
                            status: "SUCCESS",
                            message: "Signin successful",
                            data: data
                        })
                    } else {
                        res.json({
                            status: "FAILED",
                            message: "Invalid password entered!"
                        })
                    }
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while comparing passwords"
                    })
                })
            } 
            else {
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered!"
                })
            }
        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occurred while checking existing user"
            })
        })
    }
})

module.exports = router;
