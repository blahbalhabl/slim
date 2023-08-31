const { Router } = require('express');
const {
    getUsers,
    createUser,
    loginUser,
    refreshAccessToken,
} = require('../controllers/userController');
const { verify } = require('../middlewares/verifyToken');
const router = Router();

//Routes
router.get('/users', verify, getUsers);
router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/refresh', refreshAccessToken);

module.exports = router;
