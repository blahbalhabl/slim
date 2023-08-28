require('dotenv').config();
const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];

    !token ? res.status(404).json('No access token') : null;

    jwt.verify(token, process.env.ACCESS_SECRET, (err, payload) => {
        err ? res.status(400).json('Invalid Token') : null;
        req.id = payload.id
        next();
    });
}

module.exports = { verify };
