// server/server.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config(); // Load environment variables

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware for parsing incoming requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Initialize Apollo Server
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();
  server.applyMiddleware({ app });

  // Fallback route to serve React's index.html for any unrecognized routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  // Connect to MongoDB and start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`🚀 GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Start the Apollo Server and Express app
startApolloServer();
