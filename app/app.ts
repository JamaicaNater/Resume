const express = require('express');
const session = require('express-session');
const cors = require('cors')
const requireAuth = require('./middleware/requireAuth')

const { connectDatabase, disconnectDatabase } = require('./models/db')
const { redisStore, connectRedis } = require('./redis')

const app = express();

connectDatabase();
connectRedis();

// Import routes
const homepageRoutes = require('./routes/homepage');
const projectRoutes = require('./routes/project');
const experineceRoutes = require('./routes/experience');
const referenceRoutes = require('./routes/reference');
const educationRoutes = require('./routes/education');
const userRoutes = require('./routes/user');
const jobRoutes = require('./routes/job');
const tagRoutes = require('./routes/tag');
const authRoutes = require('./routes/auth');

//Middleware
app.use(session({
  store: redisStore,
  secret: process.env.API_SESSION_KEY,
  resave: false,
  saveUninitialized: true,
}));

// Apply requireAuth middleware for all routes except /auth
app.use(requireAuth.unless({
  path : [
    '/',
    '/auth',
    '/auth/'
  ],
  method: ['OPTIONS']
}));

app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:5173', 'https://localhost'],
  credentials: true,
}

app.options('*', cors(corsOptions));

app.use(cors(corsOptions));

// Use routes
app.use('/', homepageRoutes);
app.use('/projects', projectRoutes);
app.use('/experience', experineceRoutes);
app.use('/references', referenceRoutes);
app.use('/education', educationRoutes);
app.use('/users', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/tags', tagRoutes);
app.use('/auth', authRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
