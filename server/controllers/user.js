const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const { axios } = require("axios");

const client_id = `4dc1a554759b469cba35a471202abcbe`;
const client_secret = `b216b0ca8a314ef3afff16f6d8ab6f7e`;
const redirect_uri = `http://localhost:5173/home`;

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

  static async spotifyLogin(req, res, next) {
    try {
      const scope = `user-library-read playlist-read-private`;
      const auth_query_parameters = querystring.stringify({
        response_type: `code`,
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
      });

      res.redirect(
        `https://accounts.spotify.com/authorize?${auth_query_parameters}`
      );
    } catch (err) {
      next(err);
    }
  }

  static async spotifyLoginPost(req, res, next) {
    const code = req.query.code || null;
    try {
      const response = await axios({
        method: "post",
        url: `https://accounts.spotify.com/api/token`,
        data: querystring.stringify({
          grant_type: `authorization_code`,
          code: code,
          redirect_uri: redirect_uri,
          client_id: client_id,
          client_secret: client_secret,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token, refresh_token } = response.data;
      res.redirect(
        `http://localhost:5173?access_token=${access_token}&refresh_token=${refresh_token}`
      );
    } catch (error) {}
  }
}

module.exports = UserController;
