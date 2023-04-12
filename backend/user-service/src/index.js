import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import colors from 'colors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import findConfig from 'find-config';

dotenv.config({ path: findConfig('.env.user') });

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.yellow.bold);
});
