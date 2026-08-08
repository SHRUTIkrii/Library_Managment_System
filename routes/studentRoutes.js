const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

router.get("/", async (req, res) => {

    try {

        const students = await Student.find();

        res.render("students/index", {
            students: students
        });

    } catch (error) {

        res.send(error.message);

    }

});

router.get("/add", (req, res) => {

    res.render("students/add");

});

router.post("/add", async (req, res) => {

    try {

        const student = new Student({

            name: req.body.name,

            email: req.body.email,

            contact: req.body.contact,

            course: req.body.course

        });

        await student.save();

        res.redirect("/students");

    } catch (error) {

        res.send(error.message);

    }

});

router.get("/edit/:id", async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        res.render("students/edit", {
            student: student
        });

    } catch (error) {

        res.send(error.message);

    }

});

router.post("/edit/:id", async (req, res) => {

    try {

        await Student.findByIdAndUpdate(req.params.id, {

            name: req.body.name,

            email: req.body.email,

            contact: req.body.contact,

            course: req.body.course

        });

        res.redirect("/students");

    } catch (error) {

        res.send(error.message);

    }

});

router.post("/delete/:id", async (req, res) => {

    try {

        await Student.findByIdAndDelete(req.params.id);

        res.redirect("/students");

    } catch (error) {

        res.send(error.message);

    }

});

module.exports = router;