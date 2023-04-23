import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import colors from 'colors';
// import connectDB from './config/db.js';
import smsRoutes from './routes/smsRoutes.js';
import findConfig from 'find-config';

dotenv.config({ path: findConfig('.env.sms') });

// connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/sms', smsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.yellow.bold);
});
