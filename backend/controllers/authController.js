const User = require('../models/User');
const { createToken } = require('../utils/jwtHelper');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError('Email already registered', 400);
  }

  const user = await User.create({
    name,
    email,
    password
  });

  const token = createToken(user._id);

  res.status(201).json({
    status: 'success',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.verifyPassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const token = createToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});