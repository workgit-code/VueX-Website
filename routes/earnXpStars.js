var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
//import user mongoose model
var User = require("../server/users/models/user");
const jsonencodedParser = bodyParser.json({ extended: false });

const url =
  "mongodb+srv://momothegame:5Ugsr7bpk88EXsr@momo.tikol.mongodb.net/UserDB?retryWrites=true&w=majority";

mongoose.connect(url);

//define task schema 
const TaskSchema = new mongoose.Schema({
    taskName: String,
    taskDescription: String,
    stars: Number,
    xp: Number,
  });

//define challenge schema 
const ChallengeSchema = new mongoose.Schema({
  taskName: String,
  taskDescription: String,
  stars: Number,
  xp: Number,
  week: Number,
  year: Number,
});

//task model instance to make queries 
const Task = mongoose.model("Task", TaskSchema);

//challenge model instance to make queries 
const Challenge = mongoose.model("Challenge", ChallengeSchema);


//endpoint to update the stars and xp given a task name
router.post("/task", jsonencodedParser, (req, res) => {
    console.log("Processing xp and stars update");
    taskName = req.body.taskName; //retrieve task name from the request body
    username = req.body.username; //retrieve user name from the request body
    // find task by taskName in mongodb
    Task.find({ taskName: taskName }, function (err, result) {
      console.log(result);
      let { taskName, xp, stars } = result[0]; //unpack json into variables
      User.findOneAndUpdate(
        { username: username },
        { $inc: { xp: xp, stars: stars } }
      )
        .exec()
        .then((result) => {
          console.log(
            "username:" + username + " updated xp to: " + result.xp
          );
        });
    });
    //send feedback to view with updated stars an xp
  });

  //endpoint to update the stars and xp given a challenge name
router.post("/challenge", jsonencodedParser, (req, res) => {
  console.log("Processing xp and stars update for challenges");
  challengeName = req.body.challengeName; //retrieve task name from the request body
  username = req.body.username; //retrieve user name from the request body
  // find task by taskName in mongodb
  Challenge.find({ taskName: challengeName }, function (err, result) {
    console.log(result);
    let { taskName, xp, stars } = result[0]; //unpack json into variables
    User.findOneAndUpdate(
      { username: username },
      { $inc: { xp: xp, stars: stars } }
    )
      .exec()
      .then((result) => {
        console.log(
          "username:" + username + " updated xp to: " + result.xp
        );
      });
  });
  //send feedback to view with updated stars an xp
});

module.exports = router;