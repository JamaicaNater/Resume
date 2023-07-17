const express = require('express');
const app = express();
const { connectDatabase, disconnectDatabase } = require('./models/db')

connectDatabase()

// Import routes
const projectRoutes = require('./routes/project');
const homepageRoutes = require('./routes/homepage');

// Middleware
app.use(express.json());

// Use routes
app.use('/projects', projectRoutes);
app.use('/', homepageRoutes);


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
