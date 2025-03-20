const express = require("express");
const JWT = require("jsonwebtoken");

const app = express();
const jwtPass = "S3cret";

app.post("/user/signup", function (req, res) {});
app.post("/user/login", function (req, res) {});
app.get("/courses", function (req, res) {});
app.post("/user/buy", function (req, res) {});
app.get("/user/courses", function (req, res) {});

app.listen(3000);
