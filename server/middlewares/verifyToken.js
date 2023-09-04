require("dotenv").config();
const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  // Get Access Token from httpOnly cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json("No access token found");
  }

  jwt.verify(token, process.env.ACCESS_SECRET, (err, payload) => {
    if (err) {
      return res.status(400).json("Invalid Token");
    }
    req.id = payload.id;
    next();
  });
};

module.exports = { verify };
