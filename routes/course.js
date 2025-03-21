const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { PurchaseModel, CourseModel } = require("../db");
const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await PurchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    message: "Course bought!",
  });
});

courseRouter.get("/preview", async function (req, res) {
  const courses = await CourseModel.find({});

  res.json({
    courses,
  });
});

module.exports = {
  courseRouter: courseRouter,
};
