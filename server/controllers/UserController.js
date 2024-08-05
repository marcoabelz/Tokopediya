const { User } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const validator = require("validator");
const { compare } = require("bcryptjs");
const { signToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      let { name, email, password, address, phoneNumber, avatar } = req.body;
      if (!password) throw { name: "EmptyPassword" };
      password = hashPassword(password);
      await User.create({ name, email, password, address, phoneNumber, avatar });
      res.status(201).json({ message: `User: ${name} created!` });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "EmptyLogin" };
      if (!validator.isEmail(email)) {
        throw { name: "InvalidEmail" };
      }
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) throw { name: "NotFound" };
      if (!comparePassword(password, user.password)) throw { name: "InvalidLogin" };
      res.status(200).json({ accessToken: signToken({ id: user.id }), role: user.role });
    } catch (error) {
      next(error);
    }
  }
  static async getAllUser(req, res, next) {
    try {
      let data = await User.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      let [data] = await User.findAll({
        where: {
          id,
        },
        attributes: { exclude: ["password"] },
      });
      console.log(data, "data");
      if (!data) throw { name: "NotFound" };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async updateUserById(req, res, next) {
    try {
      const { id } = req.params;
      let data = await User.findByPk(id);
      if (!data) throw { name: "NotFound" };
      let { name, email, password, address, phoneNumber, avatar } = req.body;
      let updatedData = await data.update({ name, email, password: hashPassword(password), address, phoneNumber, avatar });
      console.log(updatedData, "updated");
      res.status(200).json({ message: `Data ${updatedData.name} updated!` });
    } catch (error) {
      next(error);
    }
  }
  static async deleteUserById(req, res, next) {
    try {
      const { id } = req.params;
      let data = await User.findByPk(id);
      if (!data) throw { name: "NotFound" };
      await User.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: `Data ${data.name} deleted!` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
