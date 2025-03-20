const signup = (req, res, next) => {
  res.json({
    status: 'success',
    message: 'signup working',
  });
};

module.exports = { signup };
