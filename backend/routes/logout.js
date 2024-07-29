// logout.js (Express route handler)
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/requireAuth');

router.post('/logout', authMiddleware, (req, res) => {
  // Invalidate the JWT token or session
  res.clearCookie('token'); // If using cookies
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
