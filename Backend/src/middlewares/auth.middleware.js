let jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

let authMiddleware = async (req, res, next) => {
  try {
    // Cookie se token nikalo
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).send({ message: "Unauthorized: No token provided" });
    }

    // Token verify karo
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Decoded data ko request me attach karo
    let currentUser = await UserModel.findById(decoded.id)
    req.user = currentUser;

    // Aage chalo
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Unauthorized: Invalid or expired token",
      error,
    });
  }
};

module.exports = authMiddleware;
