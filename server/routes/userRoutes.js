const { Router } = require("express");
const {
  getUsers,
  getUser,
  createUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  changePassword,
} = require("../controllers/userController");
const { 
  avatarUpload, 
  getAvatars,
  delAvatar,
} = require('../controllers/avatarController');
const { verify } = require("../middlewares/verifyToken");
const { image } = require('../middlewares/configureMulter')
const router = Router();

// General Routes
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

// Apply the verify middleware to this route
router.use(verify);

// Protected Routes
router.get("/users", getUsers);
router.get("/user", getUser);
router.get('/avatars', getAvatars);
router.post("/signup", createUser);
router.post('/change-password', changePassword);
router.post('/avatar-upload', image.single('avatar'), avatarUpload);
router.delete('/delete-avatar/:fileName', delAvatar);


module.exports = router;
