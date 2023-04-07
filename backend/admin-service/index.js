const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3119;

const app = express();

app.use(express.json());
app.use(cors());

const MongoURI = process.env.MONGO_URI;

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
});

//import routers
const adminOrderList = require('./end-points/AdminOrderList');
const adminUserList = require('./end-points/AdminUserList');

app.use('/api', adminOrderList);
app.use('/api', adminUserList);

app.listen(port, () => {
    console.log('Server is running on port', port);
});
