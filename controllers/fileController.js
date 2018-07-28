const multer = require('multer');
const func = require('../config/function');

const storageImg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads/images');
  },
  filename: (req, file, cb) => {
    cb(null, func.getFileName(file.originalname));
  },
});

const uploadImg = multer({
  storage: storageImg,
});

const storageFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads/files');
  },
  filename: (req, file, cb) => {
    cb(null, func.getFileName(file.originalname));
  },
});

const uploadFile = multer({
  storage: storageFile,
});

module.exports = {
  uploadImg: uploadImg,
  uploadFile: uploadFile,
};
