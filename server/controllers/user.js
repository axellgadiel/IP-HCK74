const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

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

  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
