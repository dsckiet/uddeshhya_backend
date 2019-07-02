require("dotenv").config();
const ContactForm = require("../models/ContactForm");

const contactForm = async (req, res) => {
  let {
    email,
    name,
    phone,
    sharedMessage
  } = req.body;

  let contact = await ContactForm.findOne({ email: req.body.email });
  debugger
  if (contact.sharedMessage === req.body.sharedMessage)
    return res
      .status(200)
      .json({ message: "You can't send same message again!" });

  contact = new ContactForm({
    email,
    name,
    phone,
    sharedMessage
  });
  try {
    await contact.save();
    res.status(200).json({ message: "success", error: false });
  } catch (err) {
    res.status(400).json({ message: err.message, error: true });
  }
};

const contactFormList = async (req, res) => {
  try {
    let data = await ContactForm.find();
    res.status(200).json({ message: "success", error: false, data });
  } catch (err) {
    res.status(400).json({ message: err.message, error: true, data: null });
  }
};

module.exports = {
  contactForm,
  contactFormList
};
