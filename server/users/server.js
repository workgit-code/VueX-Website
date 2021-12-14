//mongodb
require("./config/db");

const app = require("express")();
const port = process.env.PORT || 3000;
const cors = require("cors");

const UserRouter = require("./api/user");

//For accepting post form data
const bodyParser = require("express").json;
app.use(bodyParser());

app.use(cors());
app.options('*', cors()) // enable pre-flight request for DELETE request

app.all('/*', function(req, res, next) {
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


app.use("/user", UserRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
