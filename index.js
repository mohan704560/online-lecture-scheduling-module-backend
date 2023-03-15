import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import course from "./Schema/courseSchema.js";
import multer from "multer";
import user from "./Schema/userSchema.js";
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1/course");

app.get("/", (req, res) => {
  res.json({ status: "server is started" });
});

app.get("/course", async (req, res) => {
  const data = await course.find();
  res.status(200).send({ data: data });
});

app.get("/user", async (req, res) => {
  const data = await user.find();
  res.status(200).send({ data: data });
});

app.post("/course", upload.single("thumbnail"), async (req, res) => {
  try {
    const courseObject = await course.create({
      ...req.body,
      thumbnail: { data: req.file.buffer, contentType: req.file.mimetype },
    });
    res
      .status(200)
      .send({ Response: "Course added successfully", data: courseObject });
  } catch (e) {
    res.status(400).send({ Response: "Please fill all field" });
  }
});

app.listen(5000, () => {
  console.log("Server started");
});
