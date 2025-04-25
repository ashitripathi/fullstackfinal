const Profile = require("../models/Profile");

exports.createOrUpdateProfile = async (req, res) => {
  const { bio, skills } = req.body;
  const profile = await Profile.findOneAndUpdate(
    { user: req.user },
    { bio, skills: skills.split(",").map((skill) => skill.trim()) },
    { new: true, upsert: true }
  );
  res.json(profile);
};

exports.getAllProfiles = async (req, res) => {
  const { skill } = req.query;
  let query = {};
  if (skill) query.skills = skill;
  const profiles = await Profile.find(query).populate("user", "username email");
  res.json(profiles);
};

exports.getProfileById = async (req, res) => {
  const profile = await Profile.findById(req.params.id).populate(
    "user",
    "username email"
  );
  if (!profile) return res.status(404).json({ message: "Profile not found" });
  res.json(profile);
};
