const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const {
    register,
    login,
    protectedRoute,
    updateUser,
    deleteUser,
    checkSession
} = require('../controllers/userController');

const mockUser = {
    username: 'john_doe',
    email: 'john@example.com',
    // Passwords should not be sent to the frontend
    // You might want to show other info like date of birth, address, etc.
  };

  router.get('/profile', (req, res) => {
    // Replace with actual user fetching logic
    res.json(mockUser);
  });

router.post('/register', register);

router.post('/login', login);

router.get('/protected', protectedRoute);

router.put('/update', updateUser);

router.delete('/delete', deleteUser);

router.get('/checkSession', checkSession);

module.exports = router;
