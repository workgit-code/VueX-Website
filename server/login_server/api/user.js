const express = require("express");
const router = express.Router();
const multer = require("multer");
const http = require("http");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const multiparty = require("multiparty");
const bodyParser = require("body-parser");
//import user mongoose model
var User = require("./models/user");
const jsonencodedParser = bodyParser.json({ extended: false });

const url =
  "mongodb+srv://momothegame:5Ugsr7bpk88EXsr@momo.tikol.mongodb.net/UserDB?retryWrites=true&w=majority";

mongoose.connect(url);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
router.options("*", cors()); // enable pre-flight request for DELETE request
router.use(function (req, res, next) {
  console.log("this works");
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

// const upload = multer({
//   dest: "../profilePictures"
// });

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

// mongodb user model
const User = require("./../models/user");

//task model instance to make queries 
const Task = mongoose.model("Task", TaskSchema);

//challenge model instance to make queries 
const Challenge = mongoose.model("Challenge", ChallengeSchema);

// Password handler
const bcrypt = require("bcrypt");

// nodemon ./server.js localhost 3000
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;
const status = "FAILED";
//default values for xp and stars
const DEFAULT_XP = 0;
const DEFAULT_STARS = 0;
const DEFAULT_LEVEL = 1;
let notAutorised = false;
// Sign up
router.post("/signup", (req, res) => {
  let { username, email, password, repPass } = req.body;
  username = username.trim();
  email = email.trim();
  password = password.trim();
  repPass = repPass.trim();
  // let code;
  // let json_response;

  if (!username || !email || !password || !repPass) {
    res.status(BAD_REQUEST).json({ status, message: "Empty input fields" });
    res.destroy();
    notAutorised = true;
    // process.exit();
  }

  if (!/^[a-zA-Z0-9._]*$/.test(username)) {
    res
      .status(BAD_REQUEST)
      .json({ status, message: "Invalid username entered!" });
    res.destroy();
    notAutorised = true;
    // process.exit();
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.status(BAD_REQUEST).json({ status, message: "Invalid email entered!" });
    res.destroy();
    notAutorised = true;
    // process.exit();
  }

  if (repPass !== password) {
    res
      .status(BAD_REQUEST)
      .json({ status, message: "Passwords are not matching!" });
    res.destroy();
    notAutorised = true;
    // process.exit();
  }

  if (password.length < 8) {
    res
      .status(BAD_REQUEST)
      .json({ status, message: "Password should be at least 8 characters!" });
    res.destroy();
    notAutorised = true;
    // process.exit();
  }

  // function checkSignupFields(res, username, email, password, repPass);

  User.find({ $or: [{ username }, { email }] })
    .then((data) => {
      // Check if email is taken
      if (data.length) {
        if (data[0].email === email) {
          res
            .status(UNPROCESSABLE_ENTITY)
            .json({ message: "User with the provided email already exists." });
          res.destroy();
          // process.exit();
        } else {
          res.status(UNPROCESSABLE_ENTITY).json({
            message: "User with the provided username already exists!",
          });
          res.destroy();
          // process.exit();
        }
        notAutorised = true;
      }
      // Password handling
      const saltRounds = 10;
      return bcrypt.hash(password, saltRounds);
    })
    .then((hashedPassword) => {
      // Try to create a new user
      if (!notAutorised) {
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          xp: DEFAULT_XP,
          stars: DEFAULT_STARS,
          level: DEFAULT_LEVEL,
        });
        newUser.save();
      }
      return;
    })
    .then(() => {
      res.status(CREATED).json({
        message: "Signup successful",
        data: "Successfull",
      });
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).json({
        // Or err.message
        message: "Internal server error: " + err,
      });
    });
  // res
  // .status(status)
  // .json(json_response);
});

// Sign in
router.post("/signin", (req, res) => {
  let { username, password } = req.body;
  username = username.trim();
  password = password.trim();
  if (!username || !password) {
    res.status(BAD_REQUEST).json({
      status: "FAILED",
      message: "Empty credentials supplied!",
    });
    res.destroy();
    // process.exit();
  }

  // Check if user exists
  let dataHolder;
  User.find({ username })
    .then((data) => {
      if (!data.length) {
        res.status(UNAUTHORIZED).json({
          status: "FAILED",
          message: "Invalid credentials entered!",
        });
        res.destroy();
        // process.exit();
      }

      // User exists
      dataHolder = data;
      const hashedPassword = data[0].password;
      return bcrypt.compare(password, hashedPassword);
    })
    .then((result) => {
      // // Passwords match
      // console.log(result);
      if (result) {
        res.json({
          status: "SUCCESS",
          message: "Signin successful",
          data: dataHolder,
        });
        res.destroy();
        // process.exit();
      }

      res.status(UNAUTHORIZED).json({
        status: "FAILED",
        message: "Invalid password entered!",
      });
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).json({
        status: "FAILED",
        // Or err.message
        message: "Internal server error: " + err,
      });
    });
});

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

router.post("/upload", (req, res) => {
  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    let username = fields.userId[0];
    let tempPath = files.file[0].path;
    let originalName = files.file[0].originalFilename;

    const targetPath = path.join(
      __dirname,
      "../profilePictures/" + username + ".png"
    );

    if (path.extname(originalName).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);

        User.find({ username }).then((data) => {
          console.log(data);
        });
      });
    } else {
      fs.unlink(tempPath, (err) => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  });
});

module.exports = router;
