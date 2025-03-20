const express = require("express");
const JWT = require("jsonwebtoken");

const app = express();
const jwtPass = "S3cret";

app.post("/signup", function (req, res) {});
app.post("/login", function (req, res) {});
app.get("/courses", function (req, res) {});
app.post("/buy", function (req, res) {});
app.get("/bought", function (req, res) {});

app.listen(3000);
