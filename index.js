const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const JWT = require("jsonwebtoken");

const app = express();
const jwtPass = "S3cret";

app.use("/user", userRouter);
app.use("/course", courseRouter);

app.listen(3000);
