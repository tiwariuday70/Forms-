const User = require("../Models/userModel.js");
const express = require("express");
const Form = require("../Models/formModel.js");
const router = express.Router();
const { generateToken, isAuth } = require("../middleware/auth.js");
const { default: mongoose } = require("mongoose");

// Form Fill up
// // @route   POST /api/forms/create
const formfill = async (req, res) => {
  try {
    const {
      program,
      specification,
      image,
      personalInformation,
      parentsInformation,
      currentAddress,
      permanentAddress,
      educationQualification,
      majordocuments,
      user,
    } = req.body;
    const userExists = await Form.findOne({ user });
    if (userExists) {
      res.status(400).json({ msg: "User already exists" });
    } else {
      const createdUser = await Form.create({
        program,
        specification,
        image,
        personalInformation,
        parentsInformation,
        currentAddress,
        permanentAddress,
        educationQualification,
        majordocuments,
        user,
      });

      res.send({
        _id: createdUser._id,
        specification: createdUser.specification,
        permanentAddress: createdUser.permanentAddress,
      });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// GET ALL Form
// @route   GET /api/forms/, isAuth,isAdmin
// @access  PRIVATE/ADMIN
const getforms = async (req, res) => {
  try {
    // const {page=1,limit=10}=req.query;
    const count = await Form.countDocuments();
    const pageSize = 10;
    const page = +req.query.pagenumber || 1;
    const users = await Form.find({})
      .populate("user", "name email")
      .select("user")
      // .limit(limit *1)
      // .skip((page-1)*limit);
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

//GET USER BY ID SINGLE USER
// @route   GET /api/users/:id
// @access  PRIVATE/ADMIN

const getFormById = async (req, res) => {
  try {
    const form = await Form.findOne({
      user: mongoose.Types.ObjectId(req.params.id),
    });
    if (form) {
      res.json(form);
    } else {
      res.status(404).send({ message: "form Not Found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  formfill,
  getforms,
  getFormById,
};
