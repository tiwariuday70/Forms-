const PORT = process.env.PORT || 5000;
const express = require("express");
const db = require("./database");
const mongoose = require("mongoose");
const User = require("./Models/userModel.js");
const Form = require("./Models/formModel.js");
const auth = require("./middleware/auth.js");
const fs = require("fs");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const router = express.Router();

const userRoute = require("./routes/userRoutes.js");
const formRoute = require("./routes/formRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes");

require("dotenv").config();

db();

const app = express();

app.use(cors());
app.use(express.json());
const __dirname1 = path.resolve();
app.use("/uploads", express.static(path.join(__dirname1, "uploads")));

app.use("/api/users", userRoute);
app.use("/api/forms", formRoute);
app.use("/api/uploads", uploadRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});
