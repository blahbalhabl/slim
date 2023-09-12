require("dotenv").config();
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.username,
      role: user.role,
    },
    process.env.ACCESS_SECRET,
    { expiresIn: `${process.env.ACCESS_EXPIRES}s` }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.username,
      role: user.role,
    },
    process.env.REFRESH_SECRET,
    { expiresIn: `${process.env.REFRESH_EXPIRES}s` }
  );
};

// Refresh the existing Access Token
const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refresh;

  if (!refreshToken) {
    return res.status(403).json({ msg: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Generate a new access token
    const newAccessToken = createAccessToken(user);

    return res.status(200).json({
      id: user.id,
      avatar: user.avatar,
      name: user.username, 
      role: user.role, 
      token: newAccessToken });
  } catch (err) {
    return res.status(400).json({ msg: "Invalid refresh token" });
  }
};

const createUser = async (req, res) => {
  const avatar = null;
  const { email, username, password, role } = req.body; 

  try {
    // Check if Email Already Exists
    const isExisting = await UserModel.findOne({ email });
    if (isExisting) {
      return res.status(400).json("User Already Exists!");
    }
    // Hash Password with Bcrypt
    const hash = await bcrypt.hash(password, 10);
    // If No Existing Email is found continue with signup
    await UserModel.create({ avatar, email, username, password: hash, role })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch {
    res.status(500).json("Something went wrong!");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find User in DB
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json("User does not exist!");
    }

    // Compare hash password
    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) {
      return res.status(400).json("Invalid Credentials");
    }

    // Generate JWT Access Token and Refresh Token
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // Save Refresh Token in Database
    user.refresh = refreshToken;
    const result = await user.save();

    // Send Refresh Token through httpOnly cookie
    res.cookie("refresh", refreshToken, {
      path: "/api",
      expires: new Date(Date.now() + 1000 * process.env.REFRESH_EXPIRES),
      httpOnly: true,
      sameSite: "lax",
    });

    return res
      .status(200)
      .json({
        id: user._id,
        avatar: user.avatar,
        name: user.username,
        role: user.role,
        token: accessToken,
      });
  } catch (err) {
    return res.status(400).json({ err, msg: "User does not exist" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().lean().exec();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({err: err});
  }
};

const getUser = async (req, res) => {
  const userId = req.id;
  try {
    const user = await UserModel.findById(userId);
    res.status(201).json({
      avatar: user.avatar,
      id: user.id,
      name: user.username,
      role: user.role
    });
  } catch (err) {
    res.status(400).json({err: err});
  }
};

const logoutUser = async (req, res) => {

  const refresh = req.cookies.refresh;
  if(!refresh) return res.status(200).json({msg: "No Cookies Found"});

  const foundUser = await UserModel.findOne({ refresh }).exec();
  if( !foundUser ) {
    res.clearCookie('refresh', {httpOnly: true, sameSite: "lax"})
    return res.status(200).json({msg: "No refresh Token Found"});
  }

  // Delete Refresh Token in DB
  try {
    foundUser.refresh = '';
    const result = await foundUser.save();
    // Clear http Only refresh cookie
    res.clearCookie('refresh', {path: '/api', httpOnly: true, sameSite: 'lax'});
    res.status(200).json({ msg: "Logged Out" });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};
