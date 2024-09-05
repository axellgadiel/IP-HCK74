const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const { Op } = require("sequelize");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      if (!email || !password) throw { message: "BadRequest" };

      const user = await User.findOne({ where: { email } });
      if (!user || !comparePassword(password, user.password))
        throw { message: "InvalidUser" };

      res.status(200).json({ access_token: signToken({ id: user.id }) });
    } catch (err) {
      console.log(err);

      next(err);
    }
  }

  static async userProfile(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: [
          "username",
          "email",
          "fullName",
          "phoneNumber",
          "address",
          "profileP",
        ],
      });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async editProfile(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  static async deleteProfile(req, res, next) {
    try {
      await User.id.destroy();
      res.json();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
