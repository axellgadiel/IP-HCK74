"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: `Email already exists`,
        },
        validate: {
          isEmail: {
            args: true,
            msg: `Email format is invalid`,
          },
          notEmpty: {
            args: true,
            msg: `Email is required`,
          },
          notNull: {
            args: true,
            msg: `Email is required`,
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: `Password is required`,
          },
          notNull: {
            args: true,
            msg: `Password is required`,
          },
          len: {
            args: [5],
            msg: `Password must be at least 5 characters`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
