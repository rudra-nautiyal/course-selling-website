const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect(

);

const User = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const Admin = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const Course = new Schema({
  title: String,
  desc: String,
  price: Number,
  imageUrl: String,
  createrId: ObjectId,
});

const Purchase = new Schema({
  purchaseId: ObjectId,
  courseId: ObjectId,
  userId: ObjectId,
});

const UserModel = mongoose.model("users", User);
const AdminModel = mongoose.model("admin", Admin);
const CourseModel = mongoose.model("courses", Course);
const PurchaseModel = mongoose.model("purchases", Purchase);

module.exports = {
  UserModel: UserModel,
  AdminModel: AdminModel,
  CourseModel: CourseModel,
  PurchaseModel: PurchaseModel,
};
