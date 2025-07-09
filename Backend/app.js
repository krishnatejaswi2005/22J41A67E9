const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const urlRoutes = require("./routes/urlRoutes");
app.use("/", urlRoutes);

module.exports = app;
