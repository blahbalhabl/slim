const express = require('express');
const { Router } = require('express');
const { verify } = require('../middlewares/verifyToken');
const { file } = require('../middlewares/configureMulter');
const {
   draftOrdinance, 
   getOrdinances,
   delOrdinance,
   updateOrdinance,
   countOrdinances,
   downloadOrdinance, 
} = require('../controllers/uploadController');
const router = Router();

// Apply the verify middleware to this route
router.use(verify);

// Serve the uploaded files from the 'uploads' directory
router.use('/uploads/files', express.static('uploads/files'));
router.get('/ordinances', getOrdinances);
router.get('/count-ordinances', countOrdinances);
router.get('/download/:fileName', downloadOrdinance);
router.post('/upload/ordinance/draft', file.single('file'), draftOrdinance);
router.post('/update-ordinance/:fileName', file.single('file'), updateOrdinance);
router.delete('/delete-ordinance/:fileName', delOrdinance);

module.exports = router;
