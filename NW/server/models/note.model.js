const mongoose = require('mongoose')

// schema and back end validations
const NoteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is required"],
        minlength: [2, "Title must be at least 2 chars long"]
    },

    body: {
        type: String,
        required: [true, "body is required"],
        minlength: [3, "body must be at least 3 characters"],
        maxlength: [255, "body must contain max of 255 characters"]
    },

}, {timestamps: true})





module.exports = mongoose.model('Note', NoteSchema)