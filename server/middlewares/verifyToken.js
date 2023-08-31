require('dotenv').config();
const jwt = require('jsonwebtoken');

// const verify = (req, res, next) => {
//     const cookies = req.headers.cookie;
//     const token = cookies.split("=")[1];

//     !token ? res.status(404).json('No access token') : null;

//     jwt.verify(token, process.env.ACCESS_SECRET, (err, payload) => {
//         err ? res.status(400).json('Invalid Token') : null;
//         req.id = payload.id
//         next();
//     });
// }

const verify = (req, res, next) => {
    const cookies = req.headers.cookie;
    
    if (!cookies) {
        return res.status(404).json('No cookies found');
    }

    const cookiesArray = cookies.split(';');
    let token = null;

    cookiesArray.forEach(cookie => {
        const [key, value] = cookie.trim().split('=');
        if (key === 'token') {
            token = value;
        }
    });

    if (!token) {
        return res.status(404).json('No access token found');
    }

    jwt.verify(token, process.env.ACCESS_SECRET, (err, payload) => {
        if (err) {
            return res.status(400).json('Invalid Token');
        }
        req.id = payload.id;
        next();
    });
};

module.exports = { verify };
