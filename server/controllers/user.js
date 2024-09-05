const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client();

class UserController {
  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const user = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: payload.password,
          fullName: payload.fullName,
          phoneNumber: payload.phoneNumber,
          address: payload.address,
          profileP: payload.profile,
        },
        hooks: false,
      });

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async userProfile(req, res, next) {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const user = await User.findByPk(id, {
        attributes: [
          "username",
          "email",
          "fullName",
          "phoneNumber",
          "address",
          "profileP",
        ],
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async editProfile(req, res, next) {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const updatableFields = [
        "username",
        "fullName",
        "phoneNumber",
        "address",
        "profileP",
      ];

      const updates = {};
      for (const field of updatableFields) {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      }

      // Update the user
      await user.update(updates);

      // Fetch the updated user data
      const updatedUser = await User.findByPk(id, {
        attributes: updatableFields,
      });

      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  static async deleteProfile(req, res, next) {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Delete the user
      await user.destroy();

      res.status(200).json({ message: "User profile deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
