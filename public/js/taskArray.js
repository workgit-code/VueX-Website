const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskName: String,
    taskDescription: String,
    stars: String,
    xp: String,
})

const TaskArraySchema = new Schema({
    Tasks:[TaskSchema]
})

const TaskArray = mongoose.model('TaskArray', TaskArraySchema)

module.exports = TaskArray;

