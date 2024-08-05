const { sign, verify } = require("jsonwebtoken");

const secret = "gryta";
module.exports = {
  signToken: (payload) => sign(payload, secret),
  verifyToken: (token) => verify(token, secret),
};
