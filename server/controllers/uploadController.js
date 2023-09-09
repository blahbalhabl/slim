require("dotenv").config();
const mongoose = require("mongoose");
const Grid = require('gridfs-stream');
const configureMulter = require('../middlewares/configureMulter');
const upload = configureMulter();

const conn = mongoose.connection;
let gfs;
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
		await gfs.files.find().toArray((err, files) => {
			if (err) return res.status(400).json({ err });
			console.log({files});
		})
	} catch (err) {
		console.error(err);
	}
}

const getFile = async (req, res) => {
  try {
    const file = await new Promise((resolve, reject) => {
      gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (err) {
          reject(err);
        }
        resolve(file);
      });
    });

    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists' });
    }

    return res.status(200).json(file);
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while retrieving the file.' });
  }
};

module.exports = { 
	handleFileUpload,
	getFiles,
	getFile, };
