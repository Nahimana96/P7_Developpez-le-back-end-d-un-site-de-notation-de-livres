const express = require("express");
const bookRouter = express.Router();
const bookCtrl = require("../controllers/books");

bookRouter.put("/:id", bookCtrl.modifyBook);
bookRouter.get("/:id", bookCtrl.getOneBook);
bookRouter.get("/", bookCtrl.getAllBooks);

module.exports = bookRouter;
