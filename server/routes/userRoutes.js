const { Router } = require("express");
const {
  getUsers,
  getUser,
  createUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} = require("../controllers/userController");
const { verify } = require("../middlewares/verifyToken");
const router = Router();

// General Routes
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

// Protected Routes
router.post("/signup", verify, createUser);
router.get("/users", verify, getUsers);
router.get("/user", verify, getUser);

module.exports = router;
