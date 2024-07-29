const User = require('../models/userModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createtoken=(_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn:'3d'})
}

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Validate password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    });
  }

  try {
    const hashedPassword = await User.hashPassword(password);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token=createtoken(user._id)
    // Exclude the password from the response
    const { password: _, ...userDetails } = user.toObject();
    res.status(201).json({ message: 'User registered successfully', userDetails,token });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      res.status(400).json({ message: 'Username or email already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token=createtoken(user._id)
    req.session.userId = user._id;
    res.status(200).json({message: "Login successsful",user:user,token:token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.protectedRoute = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.status(200).json({ message: 'This is a protected route' });
};

exports.updateUser = async (req, res) => {
    const { username, email } = req.body;
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.username = username || user.username;
      user.email = email || user.email;
      await user.save();
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Error logging out' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.checkSession = (req, res) => {
    if (req.session.userId) {
      User.findById(req.session.userId, '-password', (err, user) => {
        if (err || !user) {
          return res.status(401).json({ user: null });
        }
        res.status(200).json({ user });
      });
    } else {
      res.status(401).json({ user: null });
    }
  };

  exports.updateProfile = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findById(req.session.userId);
      if (user) {
        user.username = username || user.username;
        if (password) {
          user.password = await bcrypt.hash(password, 12);
        }
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(200).json({ message: 'Logged out successfully' });
      }
    });
  };