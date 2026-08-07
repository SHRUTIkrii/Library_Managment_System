const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const bookRoutes = require("./routes/bookRoutes");

const app = express();

const PORT = process.env.PORT || 3000;
const DATABASEURL = process.env.DATABASEURL;


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static files
app.use(express.static("public"));


// Routes
app.use("/books", bookRoutes);


// EJS
app.set("view engine", "ejs");


// Home route
app.get("/", (req, res) => {
    res.redirect("/books");
});


// MongoDB connection
mongoose.connect(DATABASEURL)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log("Database connection error:", err);
    });


// Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});