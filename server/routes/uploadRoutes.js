const { Router } = require("express");
const { 
	handleFileUpload,
 	getFiles,
	getFile,
	getImage, } = require('../controllers/uploadController');
const { verify } = require("../middlewares/verifyToken");
const router = Router();

router.post('/upload', handleFileUpload);
router.get('/files', getFiles);
router.get('/files/:filename', getFile);
router.get('/image/:filename', getImage);

module.exports = router
