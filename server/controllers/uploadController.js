require("dotenv").config();
const asyncWrapper = require('../middlewares/asyncWrapper');
const mongoose = require("mongoose");
const Grid = require('gridfs-stream');
const configureMulter = require('../middlewares/configureMulter');
const upload = configureMulter();

const conn = mongoose.connection;
let gfs

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); //Collection Name
});

// Handle file upload using the 'upload' multer instance
const handleFileUpload = (req, res) => {
  // Use the 'upload.single' middleware to handle the file upload
  upload.single('file')(req, res, (err) => {
    if (err) {
      // Handle the error
      return res.status(400).json({ error: 'File upload failed.' });
    }
    // File upload succeeded
    const file = req.file; 
    return res.status(200).json({ message: 'File uploaded successfully.', file });
  });
};

const getFiles = async (req, res) => {
	try {
		const myFiles = await gfs.files.find().sort({uploadDate: 1}).toArray();
    res.status(200).json({myFiles});
	} catch (err) {
		console.error(err);
	}
}

//  Display Single File Object
const getFile = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists' });
    }

    return res.status(200).json(file);
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while retrieving the file.' });
  }
};

//  Display Image
const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists' });
    }
    console.log('Request URL:', req.originalUrl);
    console.log('Filename:', file.filename);
    console.log('File Content Type:', file.contentType);

    // Set the Content-Type header
    // res.setHeader('Content-Type', file.contentType);

    // Create a read stream from GridFS and pipe it to the response
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);

  } catch (err) {
    res.status(500).json({ error: 'An error occurred while retrieving the file.' });
  }
};


module.exports = { 
	handleFileUpload,
	getFiles,
	getFile,
  getImage, };
