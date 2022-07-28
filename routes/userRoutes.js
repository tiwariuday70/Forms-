const User = require("../Models/userModel");
const express = require("express");

const router = express.Router();

const { generateToken, isAuth } = require("../middleware/auth.js");

const {
  registerUser,
  authSignin,
  getUsers,
  getUserById,
} = require("../controllers/usercontroller");

// To REGISTER
router.post("/register", registerUser);

// TO LOGIN OR SIGNIN
router.post("/signin", authSignin);

// GET ALL USERS
router.get("/", getUsers);

// GET SINGLE USER BY ID
router.get("/:id", getUserById);

module.exports = router;
