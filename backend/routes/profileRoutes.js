const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createOrUpdateProfile,
  getAllProfiles,
  getProfileById,
} = require("../controllers/profileController");

router.post("/", auth, createOrUpdateProfile);
router.get("/", getAllProfiles);
router.get("/:id", getProfileById);

module.exports = router;
