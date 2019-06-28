require("dotenv").config();
const Volunteer = require("../models/Volunteer");

const volunteerForm = async (req, res) => {
  let {
    email,
    name,
    phone,
    alternatePhone,
    currentAddress,
    permanentAddress,
    branch,
    year,
    bloodgroup,
    college,
    aboutUddeshhya,
    heardFrom,
    workSpan,
    skills,
    suggestion
  } = req.body;

  let volunteer = await Volunteer.findOne({ email: req.body.email });
  if (volunteer)
    return res
      .status(200)
      .json({ message: "You have already filled the form" });

  volunteer = new Volunteer({
    email,
    name,
    phone,
    alternatePhone,
    currentAddress,
    permanentAddress,
    branch,
    year,
    bloodgroup,
    college,
    aboutUddeshhya,
    heardFrom,
    workSpan,
    skills,
    suggestion
  });
  try {
    await volunteer.save();
    res.status(200).json({ message: "success", error: false });
  } catch (ex) {
    res.status(400).json({ message: ex.message, error: true });
  }
};

const volunteerList = async (req, res) => {
    try {
        let data = await Volunteer.find();
        res.status(200).json({message: "success", error: false, data});
    } catch(ex) {
        res.status(400).json({message: ex.message, error: true, data: null});
    }
}

module.exports = {
  volunteerForm, volunteerList
};
