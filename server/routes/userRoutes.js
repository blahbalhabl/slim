const { Router } = require("express");
const {
  getUsers,
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

module.exports = router;
