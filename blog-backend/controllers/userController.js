const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Received data:', req.body); // Log incoming data
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    console.log('User created:', user); // Log created user
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Error creating user:', error); // Log error
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request:', req.body); // Debugging log
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('Invalid password for email:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ user, token });
  } catch (error) {
    console.error('Login error:', error); // Log error
    res.status(400).json({ error: error.message });
  }
};
