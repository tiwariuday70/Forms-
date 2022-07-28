const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    program: {
      type: String,
      required: true,
    },

    specification: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    personalInformation: {
      firstname: { type: String, required: true },
      middlename: { type: String },
      lastname: { type: String, required: true },
      gender: { type: String, required: true },
      dateOfbirth: { type: String, required: true },
      mobileNumber: { type: Number, required: true },
      email: { type: String, required: true },
    },
    parentsInformation: {
      fathersname: { type: String, required: true },
      fathersoccupation: { type: String, required: true },
      mobilenumber: { type: Number, required: true },
      mothersname: { type: String, required: true },
      mothersoccupation: { type: String, required: true },
      hermobilenumber: { type: Number, required: true },
      guardianname: { type: String },
      relation: { type: String },
    },

    currentAddress: {
      provision: { type: String, required: true },
      district: { type: String, required: true },
      municipality: { type: String, required: true },
      wardno: { type: Number, required: true },
      tole: { type: String, required: true },
    },

    permanentAddress: {
      provision: { type: String, required: true },
      district: { type: String, required: true },
      municipality: { type: String, required: true },
      wardno: { type: Number, required: true },
      tole: { type: String, required: true },
    },

    educationQualification: {
      board: {
        slc: { type: String, required: true },
        twelve: { type: String, required: true },
      },
      fullmarks: {
        slc: { type: Number, required: true },
        twelve: { type: String, required: true },
      },
      marksobtained: {
        slc: { type: Number, required: true },
        twelve: { type: String, required: true },
      },
      percent: {
        slc: { type: Number, required: true },
        twelve: { type: String, required: true },
      },
      division: {
        slc: { type: String, required: true },
        twelve: { type: String, required: true },
      },
      passedyear: {
        slc: { type: Number, required: true },
        twelve: { type: String, required: true },
      },
      majorsubjects: {
        slc: { type: String, required: true },
        twelve: { type: String, required: true },
      },
    },
    majordocuments: {
      slc: {
        marksheet: { type: String, required: true },
        character: { type: String, required: true },
        transfer: { type: String, required: true },
      },
      twelve: {
        marksheet: { type: String, required: true },
        character: { type: String, required: true },
        transfer: { type: String, required: true },
        provision: { type: String, required: true },
      },
    },
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Form = (module.exports = mongoose.model("Form", formSchema));
