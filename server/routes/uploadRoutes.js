const { Router } = require('express');
const { verify } = require('../middlewares/verifyToken');
const { file } = require('../middlewares/configureMulter');
const {
   draftOrdinance, 
   getOrdinances, 
} = require('../controllers/uploadController');
const router = Router();

router.post('/upload/ordinance/draft', verify, file.single('file'), draftOrdinance);
router.get('/ordinances', verify, getOrdinances);

module.exports = router;

// const { Router } = require("express");
// const { 
// 	handleFileUpload,
//  	getFiles,
// 	getFile,
// 	getImage, } = require('../controllers/uploadController');
// const { verify } = require("../middlewares/verifyToken");
// const uploadMiddleware = require('../middlewares/configureMulter');
// const router = Router();

// router.post('/upload', uploadMiddleware.imageStorage.single('avatar'), handleFileUpload);
// router.get('/files', getFiles);
// router.get('/files/:filename', getFile);
// router.get('/image/:filename', getImage);

// module.exports = router
