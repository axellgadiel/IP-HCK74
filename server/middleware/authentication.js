const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw { name: "Unauthorized", message: `Invalid token` };
    }

    const access_token = bearerToken.slice("Bearer ".length);
    if (!access_token) {
      throw { name: "Unauthorized", message: `Invalid token` };
    }
    const { id } = verifyToken(access_token);
    const user = await User.findByPk(id);
    if (!user) {
      throw { name: "Unauthorized", message: `Invalid token` };
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
