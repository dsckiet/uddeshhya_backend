require("dotenv").config();
const Volunteer = require("../models/Volunteer");

//Storing the Volunteer Form data in db
const volunteerForm = async(req, res) => {
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

    //Insuring that the user can't fill the form again & again
    let volunteer = await Volunteer.findOne({ email: req.body.email });
    if (volunteer)
        return res
            .status(200)
            .json({ message: "You have already filled the form!" });

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

    //Storing the Volunteer Form data in db
    try {
        await volunteer.save();
        res.status(200).json({ message: "success", error: false });
    } catch (err) {
        res.status(400).json({ message: err.message, error: true });
    }
};

//Displaying the data from db to Admin
const volunteerList = async(req, res) => {
    try {
        let data = await Volunteer.find();
        res.status(200).json({ message: "success", error: false, data });
    } catch (err) {
        res.status(400).json({ message: err.message, error: true, data: null });
    }
};

module.exports = {
    volunteerForm,
    volunteerList
};
``