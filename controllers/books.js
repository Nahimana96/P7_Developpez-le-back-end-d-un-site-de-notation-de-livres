const Book = require("../models/books");

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};
exports.getOneBook = (req, res, next) => {
  if (req.params.id === "bestrating") {
    Book.find()

      .then((data) =>
        res.json(
          data
            .sort((a, b) => {
              return b.averageRating - a.averageRating;
            })
            .slice(0, 3)
        )
      )
      .catch((error) => res.status(401).json({ error }));
  } else {
    Book.findOne({ _id: req.params.id })
      .then((book) => res.status(200).json(book))
      .catch((error) => res.status(404).json({ error }));
  }
};
exports.modifyBook = (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Votre livre a été modifié" }))
    .catch((error) => res.status(400).json({ error }));
};
