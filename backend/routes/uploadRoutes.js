const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({

    destination(req, file, callback) {
        callback(null, "settings/uploads/")
    },

    filename(req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }

})

const checkFileType = (file, callback) => {

    const filetypes = /jpg|jpeg|png|gif/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return callback(null, true);

    } else {
        callback("Images only!")
    }
};

const upload = multer({
    storage,
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback)
    }
});

router.post("/", upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`);
});

module.exports = router;