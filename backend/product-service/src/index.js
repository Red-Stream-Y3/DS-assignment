import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import findConfig from 'find-config';
import cloudinary from 'cloudinary';

dotenv.config({ path: findConfig('.env.product') });

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);

app.use(notFound);

app.use(errorHandler);

app.delete('/:public_id', async (req, res) => {
  const { public_id } = req.params;

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.yellow.bold);
});
