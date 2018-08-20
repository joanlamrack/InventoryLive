require("dotenv").config();
const logger = require("morgan");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes/index");

let mongodburl = "mongodb://localhost:27017/inventory";
mongoose.connect(
	mongodburl,
	{ useNewUrlParser: true }
);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", function() {
	console.log("MongoDB Connected!");
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.listen(process.env.PORT||3000, () => {
	console.log("Express connected!");
});

module.exports = app;