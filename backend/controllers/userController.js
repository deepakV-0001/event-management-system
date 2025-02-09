const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

exports.getProfile = catchAsync(async (req, res) => {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  });
  
  exports.updateProfile = catchAsync(async (req, res) => {
    const { name, email } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    );
  
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  });