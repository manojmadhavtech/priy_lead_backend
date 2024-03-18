const multer = require('multer');
const uniqid = require('uniqid'); 
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + uniqid() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });

exports.fileUpload = (field) => upload.single(field); 