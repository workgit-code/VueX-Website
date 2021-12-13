const express = require("express");
const app = express();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const url =
  "mongodb+srv://momothegame:5Ugsr7bpk88EXsr@momo.tikol.mongodb.net/UserDB?retryWrites=true&w=majority";

mongoose.connect(url);

const formSchema = new mongoose.Schema(
  {
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

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//render the HTML & CSS
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("review_page");
});

//post form data
app.post("/", urlencodedParser, (req, res) => {
  console.log("retrieve info");
  console.log(req.body);
  //give the form data to the function
  formData(req.body);
  res.redirect("/");
});

//NOTE: in order to start the server again, you need to run nodemon server.js and type localhost:3030
server.listen(3030);
