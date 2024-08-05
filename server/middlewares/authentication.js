const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = async function (req, res, next) {
  try {
    let access_token = req.headers.authorization;
    if (!access_token) throw { name: "NotLogin" };
    const [bearer, token] = access_token.split(" ");
    if (bearer !== "Bearer") throw { name: "InvalidToken" };
    let payload = verifyToken(token);
    let user = await User.findByPk(payload.id);
    if (!user) throw { name: "InvalidToken" };
    req.user = {
      id: user.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};
