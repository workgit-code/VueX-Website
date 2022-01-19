const express = require("express");
const app = express();
var cors = require('cors');
const server = require("http").Server(app);
const reviews = require("./routes/reviews");
const earnXpStars = require("./server/login_server/earnXpStars");
const stars = require("./server/login_server/updateStars");


app.use(cors());
app.options('*', cors()) // enable pre-flight request for DELETE request

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});


//render the HTML & CSS
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get('/', function(req, res){
  res.redirect('./index.html');          
});


app.use((req, res, next) => {
  console.log(req.method + " for url " + req.url + " is incomming!");
  next();
});

// no need to render again, as we do it below in the get request
// app.get("/", (req, res) => {
//   res.render("review_page");
// });
app.use("/reviews", reviews);
app.use("/earnXpStars", earnXpStars);
app.use("/stars", stars);

app.get("/", (req, res) => {
  res.json({
    message: "Backend is listening",
  });
  // res.redirect("/index.html");
});

//NOTE: in order to start the server again, you need to run nodemon server.js and type localhost:3030
server.listen(3031);
