const express = require('express');
const app = express();
const { connectDatabase, disconnectDatabase } = require('./models/db')

connectDatabase()

// Import routes
const homepageRoutes = require('./routes/homepage');
const projectRoutes = require('./routes/project');
const experineceRoutes = require('./routes/experience')

// Middleware
app.use(express.json());

// Use routes
app.use('/', homepageRoutes);
app.use('/projects', projectRoutes);
app.use('/experience', experineceRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
