const User = require("../Models/userModel.js");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const { generateToken, isAuth } = require("../middleware/auth.js");
const { ObjectId } = require("mongodb");

// REGISTER USER
// Register a new user
// @route   POST /api/users/register
// @access  PUBLIC
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ msg: "User already exists" });
    } else {
      const createdUser = await User.create({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 8),
      });

      res.send({
        _id: createdUser._id,
        name: createdUser.ObjectIdname,
        email: createdUser.email,
        token: generateToken(createdUser),
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// LOGIN USER
// @desc    Auth user & token
// @route   POST /api/users/signin
// @access  PUBLIC

const authSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        res.send({
          _id: user._id,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL USER
// @route   GET /api/users/
// @access  PRIVATE/ADMIN
const getUsers = async (req, res) => {
  try {
    const count = await User.countDocuments();
    const pageSize = 10;
    const page = +req.query.pagenumber || 1;
    const users = await User.find({})

      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({
      total: users.length,
      users,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// /GET USER BY ID SINGLE USER
// @route   GET /api/users/:id
// @access  PRIVATE/ADMIN

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  registerUser,
  authSignin,
  getUsers,
  getUserById,
};
