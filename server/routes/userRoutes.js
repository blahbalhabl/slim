const { Router } = require('express');
const {
    getUsers,
    createUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
} = require('../controllers/userController');
const { verify } = require('../middlewares/verifyToken');
const router = Router();

// General Routes
router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logoutUser);

// Protected Routes
router.get('/users', verify, getUsers);

module.exports = router;
