const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db');
const UserModel = require('../db/models/users');
const { sendEmail } = require('../utils/mailer');
const crypto = require('crypto');
const { Sequelize, DataTypes } = require('sequelize');
// const { sign } = require('jsonwebtoken');

// Initialize the User model
const User = UserModel(sequelize, DataTypes);
const signup = async (req, res, next) => {
  try {
    const { userType, firstName, lastName, email, password } = req.body;
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // check for existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email Already Present' });
    }
    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // //generate a unique verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    //create new user
    const newUser = await User.create({
      userType,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isActive: 0,
      verificationToken,
    });

    const verificationLink = `${process.env.FRONTEND_URL}/login?token=${verificationToken}`;
    await sendEmail(
      email,
      'Verify Your Email',
      `Click the link to verify your account: ${verificationLink}`
    );

    return res.status(201).json({
      message:
        'User registered successfully! Please check your email to verify your account.',
    });
  } catch (error) {
    console.error('signup Error', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const checkUser = await User.findOne({ where: { email } });
//     if (!checkUser) {
//       return res.status(400).json({ error: 'Login failed! Please Register.' });
//     }
//     if (!checkUser.isActive) {
//       return res.status(400).json({
//         error: 'You have not varified your account,please check inbox!.',
//       });
//     }
//     const passwordValid = await bcrypt.compare(password, checkUser.password);
//     if (!passwordValid) {
//       return res
//         .status(400)
//         .json({ error: 'Login failed! Please check your credentials.' });
//     } else {
//       return res.status(200).json({
//         user: {
//           email: checkUser.email,
//           firstName: checkUser.firstName,
//           lastName: checkUser.lastName,
//         },
//       });
//     }
//   } catch (error) {
//     console.error('login error', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ where: { email } });
    if (!checkUser) {
      return res.status(400).json({ error: 'Login failed! Please Register.' });
    }
    if (!checkUser.isActive) {
      return res.status(400).json({
        error: 'You have not verified your account, please check inbox!.',
      });
    }
    const passwordValid = await bcrypt.compare(password, checkUser.password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ error: 'Login failed! Please check your credentials.' });
    } else {
      // Generate JWT token
      const token = jwt.sign(
        { userId: checkUser.id, email: checkUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        token,
        user: {
          id: checkUser.id, // Include user ID in response
          email: checkUser.email,
          firstName: checkUser.firstName,
          lastName: checkUser.lastName,
        },
      });
    }
  } catch (error) {
    console.error('login error', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = { signup, login };
