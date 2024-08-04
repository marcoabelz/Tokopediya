const { hashSync, compareSync, compare } = require("bcryptjs");

module.exports = {
  hashPassword: (password) => hashSync(password, 10),
  comparePassword: (password, hashedPassword) => compareSync(password, hashedPassword),
};
