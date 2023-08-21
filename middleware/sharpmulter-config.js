const multer = require("multer");
const sharpMulter = require("sharp-multer");

const storage = sharpMulter({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  imageOptions: {
    fileFormat: "webp",
    quality: 80,
    resize: { width: 500, height: 500 },
  },
});
module.exports = multer({ storage: storage }).single("image");
