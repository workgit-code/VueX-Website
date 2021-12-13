const express = require("express");
const router = express.Router();
const multer = require("multer")
const http = require("http");
const path = require("path");
const fs = require("fs");

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!")
};

const upload = multer({
  dest: "../profilePictures"
});

// mongodb user model
const User = require("./../models/user");

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
// Sign up
router.post("/signup", (req, res) => {
  let { username, email, password, repPass } = req.body;
  username = username.trim();
  email = email.trim();
  password = password.trim();
  repPass = repPass.trim();

  if (!username || !email || !password || !repPass)
    return res
      .status(BAD_REQUEST)
      .json({ status, message: "Empty input fields!" });

  if (!/^[a-zA-Z0-9._]*$/.test(username))
    return res
      .status(BAD_REQUEST)
      .json({ status, message: "Invalid username entered!" });

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
    return res
      .status(BAD_REQUEST)
      .json({ status, message: "Invalid email entered!" });

  if (repPass !== password) {
    return res
      .status(BAD_REQUEST)
      .json({ status, message: "Passwords are not matching!" });
  }

  if (password.length < 8)
    return res
      .status(BAD_REQUEST)
      .json({ status, message: "Password should be at least 8 characters!" });

  // function checkSignupFields(res, username, email, password, repPass);

  User.find({ $or: [{ username }, { email }] })
    .then((data) => {
      // Check if email is taken
      if (data.length)
        if (data[0].email === email)
          return res
            .status(UNPROCESSABLE_ENTITY)
            .json({ message: "User with the provided email already exists." });
        else
          return res.status(UNPROCESSABLE_ENTITY).json({
            message: "User with the provided username already exists!",
          });
      // Password handling
      const saltRounds = 10;
      return bcrypt.hash(password, saltRounds);
    })
    .then((hashedPassword) => {
      // Try to create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        xp: DEFAULT_XP,
        stars: DEFAULT_STARS,
        level: DEFAULT_LEVEL
      });

      return newUser.save();
    })
    .then((result) => {
      return res.status(CREATED).json({
        message: "Signup successful",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(INTERNAL_SERVER_ERROR).json({
        // Or err.message
        message: "Internal server error: " + err,
      });
    });
});

// Sign in
router.post("/signin", (req, res) => {
  let { username, password } = req.body;
  username = username.trim();
  password = password.trim();

  if (!username || !password)
    return res.status(BAD_REQUEST).json({
      status: "FAILED",
      message: "Empty credentials supplied!",
    });

  // Check if user exists
  let dataHolder;
  User.find({ username })
    .then((data) => {
      if (!data.length)
        return res.status(UNAUTHORIZED).json({
          status: "FAILED",
          message: "Invalid credentials entered!",
        });

      // User exists
      dataHolder = data;
      const hashedPassword = data[0].password;
      return bcrypt.compare(password, hashedPassword);
    })
    .then((result) => {
      // Passwords match
      console.log(result);
      if (result){
        return res.json({
          status: "SUCCESS",
          message: "Signin successful",
          data: dataHolder,
        });
      }

      return res.status(UNAUTHORIZED).json({
        status: "FAILED",
        message: "Invalid password entered!",
      });
    })
    .catch((err) => {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: "FAILED",
        // Or err.message
        message: "Internal server error: " + err,
      });
    });
});

router.post(
  "/upload",
  upload.single("file"),
  (req, res) => {
    let username = sessionStorage.getItem("username")
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "../profilePictures/" + username + ".png")

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        User.find({ username })
          .then((data) => {
            console.log(data)
          })
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
)

module.exports = router;