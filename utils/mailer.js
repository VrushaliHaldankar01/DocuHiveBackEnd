const nodemailer = require('nodemailer');

// create transport object

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };
  try {
    await transport.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Error in sending mail', error);
  }
};

module.exports = { sendEmail };
