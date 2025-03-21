const { Router } = require("express");
const { UserModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "user_s3cret";

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body; // TODO: adding zod validation
  // TODO: hash the passwordso plain pw is not stored in the db

  try {
    await UserModel.create({
      email,
      password,
      firstName,
      lastName,
    });
  } catch (e) {
    res.json("Incorrect inputs.");
  }

  res.json({
    message: "You have signed up.",
  });
});

userRouter.post("/login", async function (req, res) {
  const { email, password } = req.body;

  // rehash the password and bcrypt the library.

  const user = await UserModel.findOne({
    email,
    password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user_id,
      },
      JWT_USER_PASSWORD
    );

    res.json({
      token: token,
    });
  } else {
    res.status(403).json("Incorrect Credentials");
  }
});
userRouter.get("/courses", function (req, res) {});

module.exports = {
  userRouter: userRouter,
};
