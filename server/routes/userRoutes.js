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
router.post("/signup", createUser);
router.get("/users", getUsers);
router.get("/user", getUser);
router.post('/avatar-upload', image.single('avatar'), avatarUpload);
router.get('/avatars', getAvatars);
router.delete('/delete-avatar/:fileName', delAvatar);


module.exports = router;
