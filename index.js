import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import course from "./Schema/courseSchema.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const upload = multer({ dest: 'uploads/'});
import user from "./Schema/userSchema.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// const upload = multer({ storage: storage });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

mongoose.connect("mongodb://127.0.0.1/course");

app.get("/", (req, res) => {
  res.json({ status: "server is started" });
});

app.get("/course",async(req,res)=>{
    const data = await course.find();
    res.status(200).send({data:data});
})

app.get("/user",async(req,res)=>{
    const data = await user.find();
    res.status(200).send({data:data});
})

app.post("/course", upload.single("thumbnail"), async (req, res) => {
 try{
    const courseObject = await course.create(req.body);
  res.status(200).send({Response:"Please fill all field", data:courseObject});
 } 
 catch(e){
    res.status(400).send({Response:"Please fill all field"});
 }
});

app.listen(5000, () => {
  console.log("Server started");
});
