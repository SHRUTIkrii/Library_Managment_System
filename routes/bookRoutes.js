const express = require("express");
const router = express.Router();

router.get("/add", (req, res) => {
    res.render("books/add");
});

const Book = require("../models/Book");

router.post("/add", async (req, res) => {

    try {

        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            isbn: req.body.isbn,
            quantity: req.body.quantity
        });

        await book.save();

        res.send("Book added successfully");

    } catch (error) {
        res.send(error.message);
    }

});

module.exports = router;