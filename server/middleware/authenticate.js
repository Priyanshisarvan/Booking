const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
require("dotenv");

const authenticate = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers.authorization.split(" ")[1];

  if (!token) {
    res
      .status(200)
      .send({ success: false, msg: "A token is required for authentication." });
  }
  try {

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userid = decode._id;
    const obj = await user.findById(userid);

    if (obj) {
      next();      
    }   

  } catch (error) {
    if (error.name == "TokenExpiredError") {
      res.status(401).json({
        message: "Token Expired...",
      });
    } else {
      res.json({
        message: `UnAuthorize User`,
      });
    }
  }
};

module.exports = authenticate;
