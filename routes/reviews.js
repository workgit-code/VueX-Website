var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const mongoose = require("mongoose");
const url =
  "mongodb+srv://momothegame:5Ugsr7bpk88EXsr@momo.tikol.mongodb.net/UserDB?retryWrites=true&w=majority";

mongoose.connect(url);
const formSchema = new mongoose.Schema(
  {
    user: String,
    title: String,
    stars: Number,
    inputCommentArea: String,
  },
  { collection: "Reviews" }
);

//defining the model
const Form = mongoose.model("Form", formSchema);

//store the form data in a variable
const formData = (bodyData) => {
  Form(bodyData).save((err) => {
    if (err) {
      throw err;
    }
  });
};

//post form data
router.post("/", urlencodedParser, (req, res) => {
  console.log("retrieve info");
  console.log(req.body);
  //give the form data to the function
  formData(req.body);
  res.redirect("/reviews/");
});

//get the posted reviews to appear in the html (connected with the ejs file)
router.get("/", (req, res) => {
  console.log("get is working");
  Form.find({}, function (err, Reviews) {
    res.render("review_page", {
      reviewsList: Reviews,
    });
  });
});

module.exports = router;
