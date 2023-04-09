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

//import routers
//admin routes
const adminOrderList = require('./routes/AdminOrderList');
const adminUserList = require('./routes/AdminUserList');
const adminConfig = require('./routes/AdminConfig');
const adminProductList = require('./routes/AdminProductList');

app.use('/v1', adminOrderList);
app.use('/v1', adminUserList);
app.use('/v1', adminConfig);
app.use('/v1', adminProductList);

app.listen(port, () => {
    console.log('Server is running on port', port);
});
