const express = require("express");
const bookRouter = express.Router();
const bookCtrl = require("../controllers/books");
const auth = require("../middleware/auth");
const sharpMulter = require("../middleware/sharpmulter-config");

bookRouter.post("/", auth, sharpMulter, bookCtrl.postBook);
bookRouter.post("/:id/rating", auth, bookCtrl.postRate);
bookRouter.put("/:id", auth, sharpMulter, bookCtrl.modifyBook);
bookRouter.delete("/:id", auth, bookCtrl.deleteBook);
bookRouter.get("/:id", bookCtrl.getOneBook);
bookRouter.get("/", bookCtrl.getAllBooks);

module.exports = bookRouter;
