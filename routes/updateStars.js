var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
//import user mongoose model
var User = require("../server/users/models/user");
const jsonencodedParser = bodyParser.json({ extended: false });


//better to use PUT 
router.post("/", jsonencodedParser, (req, res) => {
    console.log("Processing stars update");
    username = req.body.username; //retrieve user name from the request body
    stars = req.body.stars; //retrieve stars from the request body
    // find task by taskName in mongodb
    User.findOneAndUpdate({ username: username },{stars: stars})
    .exec()
    .then((result) => {
        console.log(
            "username:" + username + " updated stars to: " + result.stars
        );
    });
        //send feedback to view with updated stars an xp
});

module.exports = router;