const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  experience: Number,
  stars: Number,
  level: Number,
  reviews: Array,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
