const express = require('express');
const { getProfile, updateProfile, logout } = require('../controllers/userController');
const router = express.Router();

router.get('/profile', getProfile);
router.post('/update', updateProfile);
router.post('/logout', logout);

module.exports = router;
