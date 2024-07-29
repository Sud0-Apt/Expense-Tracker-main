// updateUser.js (Express route handler)
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/requireAuth');
const User = require('../models/userModel');

router.put('/update', authMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;
    const userId = req.user.id;

    const updateFields = {};
    if (username) updateFields.username = username;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
});

module.exports = router;
