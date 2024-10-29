# Book Search Engine

## Overview

This is a full-stack book search engine built using the MERN (MongoDB, Express, React, Node.js) stack with GraphQL. It allows users to search for books via the Google Books API and save books to their profile. The app includes authentication, allowing users to sign up, log in, and manage their saved books.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API](#api)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

- User authentication with JWT
- Google Books API integration to search for books
- Save and remove books to/from your personal profile
- Responsive UI built with React
- Backend powered by Node.js, Express, MongoDB, and GraphQL

---

## Technologies Used

### Frontend
- **React**: For building user interfaces.
- **Tailwind CSS**: For styling the UI.
- **Vite**: For bundling the project.

### Backend
- **Node.js**: For server-side development.
- **Express**: As the web framework for Node.js.
- **MongoDB**: As the database for storing user and book data.
- **GraphQL**: For querying and mutating data on the backend.
- **JWT (JSON Web Token)**: For user authentication.

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory**:
    ```bash
    cd book-search-engine-main
    ```

3. **Install the dependencies for both the client and the server**:
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

4. **Set up environment variables**:
   Create a `.env` file in the `server` directory with the following content:
    ```plaintext
    MONGODB_URI=mongodb://localhost:27017/booksearchengine
    SECRET=your_jwt_secret
    ```

5. **Run the application**:
    - To start both the client and server:
    ```bash
    npm run develop
    ```

---

## Usage

Once the application is running, you can:

1. **Search for books**: Use the search bar to look for books via the Google Books API.
2. **Save a book**: When logged in, you can save books to your profile for future reference.
3. **View saved books**: Check the "Saved Books" section to view books you have saved.
4. **Remove saved books**: If needed, you can remove books from your saved list.

---

## Project Structure

```bash
book-search-engine-main/
├── client/                       # Frontend React app
│   ├── public/                   # Static assets
│   └── src/                      # React source code
│       ├── components/           # Reusable components
│       ├── pages/                # React pages
│       ├── utils/                # Utility files (GraphQL queries, mutations, etc.)
│       ├── App.jsx               # Main React app component
│       ├── main.jsx              # ReactDOM rendering point
│       └── index.css             # Global CSS file
├── server/                       # Backend Node.js app
│   ├── config/                   # Database connection configuration
│   ├── models/                   # MongoDB models (User, Book)
│   ├── schemas/                  # GraphQL schemas (resolvers, type definitions)
│   └── server.js                 # Main server file
├── package.json                  # Root package.json for managing dependencies
├── README.md                     # Documentation file
└── LICENSE                       # License for the project
```

---

## API

### GraphQL Queries

1. **Get User Data**
   ```graphql
   query getMe {
     me {
       _id
       username
       email
       savedBooks {
         bookId
         authors
         title
         description
         image
         link
       }
     }
   }
   ```

2. **Search Books**
   Use the Google Books API to search for books by title:
   ```graphql
   mutation searchBooks($query: String!) {
     searchBooks(query: $query) {
       bookId
       authors
       title
       description
       image
       link
     }
   }
   ```

---

## Screenshots

### Home Page
![Home Page](./client/src/assets/screenshots/homepage.png)

### Search Results
![Search Results](./client/src/assets/screenshots/search-results.png)

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.