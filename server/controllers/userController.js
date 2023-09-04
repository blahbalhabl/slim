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
    return res.status(400).json({ msg: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Generate a new access token
    const newAccessToken = createAccessToken(user);

    // Send Access Token through httpOnly cookie
    res.cookie("token", newAccessToken, {
      path: "/api",
      expires: new Date(Date.now() + 1000 * process.env.ACCESS_EXPIRES), // last digit indicates seconds
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(400).json({ msg: "Invalid refresh token" });
  }
};

const createUser = async (req, res) => {
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
    await UserModel.create({ email, username, password: hash, role })
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

    // Send Access Token through httpOnly cookie
    res.cookie("token", accessToken, {
      path: "/api",
      expires: new Date(Date.now() + 1000 * process.env.ACCESS_EXPIRES),
      httpOnly: true,
      sameSite: "lax",
    });

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
        user: user.username,
        role: user.role,
        token: accessToken,
        refresh: refreshToken,
        msg: "Successfully Logged In",
      });
  } catch (err) {
    return res.status(400).json({ err, msg: "User does not exist" });
  }
};

const getUsers = async (req, res) => {
  // const userId = req.id;
  try {
    const users = await UserModel.find().lean().exec();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("token", "", {
      path: "/api",
      expires: new Date(0),
      httpOnly: true,
      sameSite: "lax",
    });
    res.cookie("refresh", "", {
      path: "/api",
      expires: new Date(0),
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(200).json({ msg: "Logged Out" });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};
