const express = require("express");
const mongoose = require("mongoose");

const Message = require("./models/message.js");

const app = express();
app.use(express.json());

app.listen(27017, () => {
    console.log("Server listening...");
});