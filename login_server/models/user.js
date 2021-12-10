const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
<<<<<<< Updated upstream
  username: String,
  email: String,
  password: String,
  experience: Number,
  stars: Number,
  level: Number,
  reviews: Array,
});
=======
    username: String,
    email: String,
    password: String,
    xp: Number,
    stars: Number,
})
>>>>>>> Stashed changes

const User = mongoose.model("User", UserSchema);

module.exports = User;
