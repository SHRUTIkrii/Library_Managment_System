const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;
const DATABASEURL = process.env.DATABASEURL;

mongoose.connect(DATABASEURL)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log("Database connection error:", err);
    });

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Library Management System");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});