// server/models/User.js

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    savedBooks: [
      {
        bookId: {
          type: String,
          required: true,
        },
        authors: [String],
        description: String,
        title: {
          type: String,
          required: true,
        },
        image: String,
        link: String,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create the User model using the userSchema
const User = model('User', userSchema);

module.exports = User;
