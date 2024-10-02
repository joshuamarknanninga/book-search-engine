// server/models/Book.js

const { Schema } = require('mongoose');

const bookSchema = new Schema({
  bookId: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // Assuming image is a URL
  },
  link: {
    type: String,
    // Assuming link is a URL
  },
});

module.exports = bookSchema;
