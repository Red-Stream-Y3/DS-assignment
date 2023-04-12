const express = require('express');
const cors = require('cors');

require('dotenv').config({ path: require('find-config')('.env.email') });
const PORT = process.env.PORT || 9123;

const app = express();

app.use(cors());
app.use(express.json());

//import routes
const emailRoutes = require('./routes/EmailRoutes');
app.use('/v1', emailRoutes);

app.listen(PORT, () => {
    console.log(`Email service listening on port ${PORT}`);
});