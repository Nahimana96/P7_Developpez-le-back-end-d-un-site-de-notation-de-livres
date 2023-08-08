const express = require("express");
const bookRouter = express.Router();
const bookCtrl = require("../controllers/books");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

bookRouter.post("/", auth, multer, bookCtrl.postBook);
bookRouter.put("/:id", auth, multer, bookCtrl.modifyBook);
bookRouter.get("/:id", bookCtrl.getOneBook);
bookRouter.get("/", bookCtrl.getAllBooks);

module.exports = bookRouter;
