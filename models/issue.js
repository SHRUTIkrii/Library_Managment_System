const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },

    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },

    issueDate: {
        type: Date,
        default: Date.now
    },

    returnDate: {
        type: Date,
        default: null
    },

    status: {
        type: String,
        default: "Issued"
    }

});

module.exports = mongoose.model("Issue", issueSchema);