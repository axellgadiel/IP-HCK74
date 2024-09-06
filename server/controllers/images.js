const { Images } = require("../models/index.js");
const { Op } = require("sequelize");

class ImagesController {
  static async getImages(req, res, next) {
    try {
    } catch (error) {
      next(err);
    }
  }

  static async deleteImages(req, res, next) {
    try {
      await Images.id.destroy();
      res.json();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ImagesController;
