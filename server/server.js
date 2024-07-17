import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import methodOverride from 'method-override';
import ConnectMongo from 'connect-mongo';
import flash from 'express-flash';
import logger from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';
import cors from 'cors';
import { fileURLToPath } from 'url';

import { connectDB } from './config/database.js';
import { router as noteRoutes } from './routes/notes.js';
import { router as authRoutes } from './routes/auth.js';
import { configurePassport } from './config/passport.js';

// Load environment variables from .env file
dotenv.config({ path: './config/.env' });

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Determine the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'v4' directory for production
app.use(express.static(path.join(__dirname, 'v4')));

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging middleware
app.use(logger('dev'));

// Passport configuration
configurePassport(passport);

// Set up sessions - stored in MongoDB
const MongoStore = ConnectMongo.create({
  mongoUrl: process.env.DB_STRING,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'notes-app',
    resave: false,
    saveUninitialized: false,
    store: MongoStore,
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use flash messages for errors, info, etc.
app.use(flash());

// Enable CORS if needed
app.use(cors());

// Routes for which server is listening
app.use('/api/note', noteRoutes);
app.use('/api/auth', authRoutes);

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'v4', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
