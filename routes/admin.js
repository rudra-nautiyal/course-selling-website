const { Router } = require("express");
const { AdminModel, CourseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

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
        id: admin._id,
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

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const { title, desc, imageUrl, price } = req.body;

  const course = await CourseModel.create({
    title,
    desc,
    imageUrl,
    price,
    creatorId: adminId,
  });

  res.json({
    message: "Course created",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const { title, desc, imageUrl, price, courseId } = req.body;

  const course = await CourseModel.updateOne(
    { _id: courseId, creatorId: adminId },
    {
      title,
      desc,
      imageUrl,
      price,
    }
  );

  res.json({
    message: "Course updated.",
    courseId: course._id,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const courses = await CourseModel.find({
    creatorId: adminId,
  });

  res.json({
    message: "You courses",
    courses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
