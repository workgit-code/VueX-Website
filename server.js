const express = require("express");
const app = express();
const server = require("http").Server(app);
const reviews = require("./routes/reviews");
const port = process.env.PORT || 3030;
const earnXpStars = require("./routes/earnXpStars");
const stars = require("./routes/updateStars");

//render the HTML & CSS
app.set("view engine", "ejs");
app.use(express.static("public"));

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
    window.location.href = "index.html"
  });
});

//NOTE: in order to start the server again, you need to run nodemon server.js and type localhost:3030
app.listen(port, () => console.log(`Listening on port ${port}`));
