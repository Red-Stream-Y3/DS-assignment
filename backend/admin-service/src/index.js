const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config({ path: require('find-config')('.env.admin')});
const port = process.env.PORT || 3119;

const app = express();

app.use(express.json());
app.use(cors());

const MongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB\n', err);
});

//import and use routers
app.use('/v1', require('./routes/AdminOrderList'));
app.use('/v1', require('./routes/AdminUserList'));
app.use('/v1', require('./routes/AdminConfig'));
app.use('/v1', require('./routes/AdminProductList'));
app.use('/v1', require('./routes/StatisticRoutes'));

app.listen(port, () => {
    console.log('Server is running on port', port);
});
