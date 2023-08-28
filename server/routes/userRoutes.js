const { Router } = require('express');
const {
    getUsers,
    createUser,
    loginUser
} = require('../controllers/userController');
const { verify } = require('../middlewares/verifyToken');
const router = Router();

//Routes
router.get('/users', verify, getUsers);
router.post('/signup', createUser);
router.post('/login', loginUser);


module.exports = router;
