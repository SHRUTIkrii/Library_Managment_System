const express = require("express");
const router = express.Router();

const Issue = require("../models/Issue");
const Student = require("../models/Student");
const Book = require("../models/Book");

router.get("/", async (req, res) => {

    try {

        const issues = await Issue.find()
            .populate("student")
            .populate("book");

        res.render("issues/index", {
            issues: issues
        });

    } catch (error) {

        res.send(error.message);

    }

});

router.get("/add", async (req, res) => {

    try {

        const students = await Student.find();

        const books = await Book.find();

        res.render("issues/add", {
            students: students,
            books: books
        });

    } catch (error) {

        res.send(error.message);

    }

});

router.post("/add", async (req, res) => {

    try {

        const issue = new Issue({

            student: req.body.student,

            book: req.body.book

        });

        await issue.save();

        res.redirect("/issues");

    } catch (error) {

        res.send(error.message);

    }

});

router.post("/return/:id", async (req, res) => {

    try {

        await Issue.findByIdAndUpdate(req.params.id, {

            returnDate: new Date(),

            status: "Returned"

        });

        res.redirect("/issues");

    } catch (error) {

        res.send(error.message);

    }

});

module.exports = router;