module.exports.admin = async (req, res) => {
  let totalDonations = 0,
    totalAmount = 0;
  try {
    let totalVolunteers = await Volunteer.countDocuments();
    let totalBloodDonors = await BloodDonor.countDocuments();
    let totalBloodRequests = await BloodRequest.countDocuments();
    let donations = await Donation.find({ status: "success" }).sort({
      updatedAt: "desc"
    });
    donations.map(donation => {
      totalDonations++;
      totalAmount += donation.finalAmount;
    });
    res.status(200).json({
      message: "success",
      totalBloodDonors,
      totalBloodRequests,
      totalVolunteers,
      totalAmount,
      totalDonations
    });
  } catch (err) {
    res.status(500).json({ message: err.message, error: true, data: null });
  }
};

module.exports.volunteers = async (req, res) => {
  try {
    let volunteers = await Volunteer.find().sort({ createdAt: "desc" });
    if (volunteers.length !== 0) {
      res.status(200).json({ message: "success", volunteers });
    } else {
      res.status(404).json({ message: "No volunteers yet!!" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, error: true, data: null });
  }
};

module.exports.donors = async (req, res) => {
  let { bloodGroup } = req.body;
  let donors;
  try {
    if (bloodGroup) {
      donors = await BloodDonor.find({ bloodGroup }).sort({
        createdAt: "desc"
      });
    } else {
      donors = await BloodDonor.find().sort({ createdAt: "desc" });
    }

    res.status(200).json({ message: "success", donors });
  } catch (err) {
    res.status(500).json({ message: err.message, error: true, data: null });
  }
};

module.exports.bloodRequests = async (req, res) => {
  try {
    let requests = await BloodRequest.find().sort({ createdAt: "desc" });

    res.status(200).json({ message: "success", requests });
  } catch (err) {
    res.status(500).json({ message: err.message, error: true, data: null });
  }
};

module.exports.messages = async (req, res) => {
  try {
    let messages = await Message.find().sort({ createdAt: "desc" });
    if (messages.length !== 0) {
      res.status(200).json({ messgae: "success", messages });
    } else {
      res.status(404).json({ message: "No Messages!!" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, error: true, data: null });
  }
};

module.exports.donations = async (req, res) => {
  let totalDonations = 0,
    totalAmount = 0,
    totalCharges = 0,
    totalDonationAmount = 0;
  try {
    let donations = await Donation.find({ status: "success" }).sort({
      updatedAt: "desc"
    });
    if (donations.length === 0) {
      res.status(404).json({ message: "No Donations Yet!!" });
    } else {
      donations.map(donation => {
        totalDonations++;
        totalAmount += donation.finalAmount;
        totalCharges += donation.charges;
        totalDonationAmount += donation.amount;
      });
      res.status(200).json({
        message: "success",
        donations,
        totalDonations,
        totalCharges,
        totalDonationAmount,
        totalAmount
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, error: true, data: null });
  }
};
