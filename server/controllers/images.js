const { Images } = require("../models/index.js");
const { Op } = require("sequelize");

class ImagesController {
  static async deleteProfile(req, res, next) {
    try {
      await Images.id.destroy();
      res.json();
    } catch (err) {
      next(err);
    }
  }
}
