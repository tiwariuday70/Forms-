const express = require("express");

const router = express.Router();

const { generateToken, isAuth, isAdmin } = require("../middleware/auth.js");

const {
  formfill,
  getFormById,
  getforms,
} = require("../controllers/formcontroller.js");

// Create form
router.post("/create", isAuth, formfill);

// GET all forms
router.get("/", isAuth, isAdmin, getforms);

// GET Single form
router.get("/:id", isAuth, isAdmin, getFormById);

module.exports = router;
