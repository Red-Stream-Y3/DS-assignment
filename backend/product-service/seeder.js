import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import products from './products.js';
import Product from './src/models/productModel.js';
import connectDB from './src/config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();

    const adminUser = {
      _id: ObjectId(''),
      name: 'Admin',
      email: '',
      password: '',
      isAdmin: true,
      isSeller: false,
    };

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
