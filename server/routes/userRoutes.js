const { Router } = require("express");
const {
  getUsers,
  getUser,
  createUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} = require("../controllers/userController");
const { 
  avatarUpload, 
  getAvatars
} = require('../controllers/avatarController');
const { verify } = require("../middlewares/verifyToken");
const { image } = require('../middlewares/configureMulter')
const router = Router();

// General Routes
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

// Protected Routes
router.post("/signup", verify, createUser);
router.get("/users", verify, getUsers);
router.get("/user", verify, getUser);
router.post('/avatar-upload', verify, image.single('avatar'), avatarUpload);
router.get('/avatars', getAvatars);


module.exports = router;
