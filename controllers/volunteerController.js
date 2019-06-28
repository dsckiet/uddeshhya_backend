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
    belongToKIET,
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
    belongToKIET,
    aboutUddeshhya,
    heardFrom,
    workSpan,
    skills,
    suggestion
  });
  try {
    await volunteer.save();
    res.status(200).json({message: "success"});
  } catch (ex) {
      res.status(400).json({message: ex.message});
  }
};

module.exports = {
  volunteerForm
};
