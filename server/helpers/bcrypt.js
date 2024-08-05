const { hashSync, compareSync } = require("bcryptjs");

module.exports = {
  hashPassword: (password) => hashSync(password, 10),
  comparePassword: (password, hashedPassword) => compareSync(password, hashedPassword),
};
