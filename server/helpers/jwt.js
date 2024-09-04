const jwt = require("jsonwebtoken");
const accessToken = process.env.accessToken;

const signToken = (data) => {
  return jwt.sign(data, accessToken);
};

const verifyToken = (token) => {
  return jwt.verify(token, accessToken);
};

module.exports = {
  signToken,
  verifyToken,
};
