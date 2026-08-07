const express = require("express");
const router = express.Router();

const Book = require("../models/Book");


router.get("/", async (req, res) => {

    try {

        const books = await Book.find();

        res.render("books/index", {
            books: books
        });

    } catch (error) {

        res.send(error.message);

    }

});



router.get("/add", (req, res) => {

    res.render("books/add");

});



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

        res.redirect("/books");

    } catch (error) {

        res.send(error.message);

    }

});


router.get("/edit/:id", async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.send("Book not found");
        }

        res.render("books/edit", {
            book: book
        });

    } catch (error) {

        res.send(error.message);

    }

});


router.post("/edit/:id", async (req, res) => {

    try {

        await Book.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                isbn: req.body.isbn,
                quantity: req.body.quantity
            }
        );

        res.redirect("/books");

    } catch (error) {

        res.send(error.message);

    }

});

router.post("/delete/:id", async (req, res) => {

    try {

        await Book.findByIdAndDelete(req.params.id);

        res.redirect("/books");

    } catch (error) {

        res.send(error.message);

    }

});


module.exports = router;