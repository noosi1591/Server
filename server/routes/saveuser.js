// saveuser.js

const express = require("express");
const router = express.Router();

// Import saveuser function
const saveUserData = require("../controllers/saveuser");

router.post("/", (req, res) => {
  const userData = req.body;
  if (!userData) {
    return res.status(400).send('Invalid user data');
  }
  console.log(userData);
  saveUserData(userData);
  res.status(200).send('User data received and being saved.');
});

module.exports = router;