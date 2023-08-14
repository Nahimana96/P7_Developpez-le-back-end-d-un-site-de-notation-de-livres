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
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() =>
            res.status(200).json({ message: "Votre livre a été modifié!" })
          )
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.postBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Votre livre a été enregistré" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Book.deleteOne({ _id: req.params.id })
          .then(() =>
            res
              .status(200)
              .json({ message: "Ce livre a été supprimé avec succes" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.postRate = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      let isInRatingsList = book.ratings.some((rateInfo) => {
        return rateInfo.userId === req.auth.userId;
      });

      if (isInRatingsList) {
        res.status(401).json({ message: "vous avez déjà noté ce livre" });
      } else {
        book.ratings.push({
          userId: req.auth.userId,
          grade: req.body.rating,
        });
        let sumOfRatings = book.ratings
          .map((rate) => rate.grade)
          .reduce((acc, curr) => acc + curr);
        book.averageRating = sumOfRatings / book.ratings.length;
        book
          .save()
          .then(() => res.status(200).json(book))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch(() => res.status(400).json({ message: "erreur" }));
};
