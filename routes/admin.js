const { Router } = require("express");
const { AdminModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = "admin_s3cret";

const adminRouter = Router();

adminRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body; // TODO: adding zod validation
  // TODO: hash the passwordso plain pw is not stored in the db

  try {
    await AdminModel.create({
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
adminRouter.post("/login", async function (req, res) {
  const { email, password } = req.body;

  // rehash the password and bcrypt the library.

  const admin = await AdminModel.findOne({
    email,
    password,
  });

  if (admin) {
    const token = jwt.sign(
      {
        id: user_id,
      },
      JWT_ADMIN_PASSWORD
    );

    res.json({
      token: token,
    });
  } else {
    res.status(403).json("Incorrect Credentials");
  }
});

adminRouter.post("/course", function (req, res) {});
adminRouter.put("/course", function (req, res) {});
adminRouter.get("/course/bulk", function (req, res) {});

module.exports = {
  adminRouter: adminRouter,
};
