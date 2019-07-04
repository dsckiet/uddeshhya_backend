const mongoose = require("mongoose");

//Volunteer Form schema
const volunteerSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        length: 10,
        required: true
    },
    alternatePhone: {
        length: 10,
        type: Number
    },
    currentAddress: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        enum: ["CSE", "IT", "CSI", "ECE", "EI", "EN", "ME", "CE", "MCA", "MBA", "Others"],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    bloodgroup: {
        type: String,
        required: true
    },
    college: {
        type: String
    },
    aboutUddeshhya: {
        type: String,
        required: true
    },
    heardFrom: {
        type: String,
        required: true,
        enum: ["Faculity", "Friends", "Social media", "Others"]
    },
    workSpan: {
        type: String,
        required: true,
        enum: ["6 Months", "1 Year", "Other"]
    },
    skills: {
        type: [{ skill: String }],
        required: true
    },
    suggestion: {
        type: String
    }
});
const Volunteer = mongoose.model("volunteer", volunteerSchema);
module.exports = Volunteer;