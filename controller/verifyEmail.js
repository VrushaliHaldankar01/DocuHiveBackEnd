const User = require('../db/models/users');

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const user = await User.findOne({ where: { verificationToken: token } });
    if (!user) {
      return res.status(400).json({ error: 'invalid or expired token' });
    }
    //Activate the user

    user.isActive = 1;
    user.verificationToken = null;
    await user.save();
    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { verifyEmail };
