var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

//Image allow jpeg,png,jpg
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg,png and jpg supported"), false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

//Image 5 mb allows
var imageUpload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5, //5mb
  },
  fileFilter: fileFilter,
});

module.exports = {
  imageUpload,
};
