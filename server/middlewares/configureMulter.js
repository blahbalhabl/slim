const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/images');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const imageFilter = (req, file, cb) => {
  const allowedFile = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFile.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb("Invalid File Type", false);
  }
};

const fileStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/files');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFile = ['application/pdf', 'application/rtf'];
  if (allowedFile.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb("Invalid File Type", false);
  }
};

const image = multer(
  { 
    storage: imageStorage,
    imageFilter, 
  });

const file = multer(
  {
    storage: fileStorage,
    fileFilter,
  }
)

module.exports = { image, file };

// const configureMulter = () => {
//   //Create Storage Object
//   const storage = new GridFsStorage({
//     url: process.env.DB_URI,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString('hex') + path.extname(file.originalname);
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads',
//             metadata: {
//               status: 'pending' // Add your custom 'status' property here
//             }
//           };
//           resolve(fileInfo);
//         });
//       });
//     }
//   });
//   const upload = multer({ storage });

//   return upload;
// }
