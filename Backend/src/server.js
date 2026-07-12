import app from './app.js';
import connectDB from './config/db.js';
import { env } from './config/env.js';
import cors from 'cors';
import express from 'express';

// Connect to Database
connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' })); 
app.use(express.json());

const server = app.listen(env.PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  server.close(() => process.exit(1));
});
