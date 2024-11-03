const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookId: { type: String, required: true },
  authors: [String],
  title: { type: String, required: true },
  description: String,
  image: String,
  link: String,
});

module.exports = mongoose.model('Book', bookSchema);
