import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all users
// @route   GET /users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();

    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { getUsers };
