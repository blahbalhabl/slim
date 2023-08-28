require('dotenv').config();
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const genRefreshToken = () => {
    jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.REFRESH_SECRET,
        { expiresIn: '30s' }
    )
}

const createUser = async (req, res) => {
    const { email, username, password, role } = req.body;

    try{
        // Check if Email Already Exists
        const isExisting = await UserModel.findOne({ email });
        if (isExisting) {
            return res.status(401).json('User Already Exists!');
        }
        // Hash Password with Bcrypt
        const hash = await bcrypt.hash(password, 10);
        // If No Existing Email is found continue with signup
        await UserModel.create({ email, username, password: hash, role })
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(401).send(err);
        })
    } catch {
        res.status(500).json('Something went wrong!');
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const expires = '15';

    try {
        // Find User in DB
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json('User does not exist!');
        }

        // Compare hash password
        const passMatch = await bcrypt.compare(password, user.password);

        if (!passMatch) {
            return res.status(400).json('Invalid Credentials');
        }
        // Generate JWT Access Token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.ACCESS_SECRET,
            { expiresIn: `${expires}s` }
        );

        // Send Access Token through httpOnly cookie
        res.cookie(user._id, token, {
            path: '/api',
            expires: new Date(Date.now() + 1000 * expires),
            httpOnly: true,
            sameSite: 'lax'
        });

        return res.status(200).json({ user: user, token, msg: 'Successfully Logged In' });
    } catch (err) {
        return res.status(401).json({ err, msg: 'User does not exist' });
    }
};

const getUsers = async (req, res) => {
    // const userId = req.id;
    try {
        const users = await UserModel.find().lean().exec();
        res.status(201).json(users);
    } catch(err) {
        res.status(400).json(err);
    }
};

module.exports = {
    getUsers,
    createUser,
    loginUser
}
