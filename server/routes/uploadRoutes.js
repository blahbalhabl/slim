const { Router } = require("express");
const { 
	handleFileUpload,
 	getFiles, } = require('../controllers/uploadController');
const { verify } = require("../middlewares/verifyToken");
const router = Router();

router.post('/upload', verify, handleFileUpload);
router.get('/files', getFiles);

module.exports = router
