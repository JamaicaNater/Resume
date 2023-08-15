import express from 'express';
import session from 'express-session';
import cors from 'cors';
import requireAuth from './middleware/requireAuth';

import { connectDatabase } from './models/db';
import { redisStore, connectRedis } from './redis'

const app = express();

connectDatabase();
connectRedis();

// Import routes
import homepageRoutes from './routes/homepage';
import projectRoutes from './routes/project';
import experineceRoutes from './routes/experience';
import referenceRoutes from './routes/reference';
import educationRoutes from './routes/education';
import userRoutes from './routes/user';
import jobRoutes from './routes/job';
import tagRoutes from './routes/tag';
import authRoutes from './routes/auth';

//Middleware
// Todo throw error
app.use(session({
  store: redisStore,
  secret: process.env.API_SESSION_KEY ?? '',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000, // Session expiration in milliseconds (1 hour)
    httpOnly: true,
    path: '/',
  },
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
