const router = require("../server/users/api/user");

// mongodb user model
const User = require("../server/users/models/user");

const Tasks = require("./taskArray");

// nodemon ./server.js localhost 3000
const UPDATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;
const status = "FAILED";

// handle new tasks completed by a user
router.post("/task", (req, res) => {
  let { taskName } = req.body;
  
  Tasks.find("Tasks": { $elemMatch : { "taskName" : taskName}})
    .then((data) => {
        var gained_xp = data[0].xp;
        var gained_stars = data[0].stars;
     )};
    .catch((err) => {
      return res.status(INTERNAL_SERVER_ERROR).json({
        // Or err.message
        message: "Internal server error: " + err,
      });
});

