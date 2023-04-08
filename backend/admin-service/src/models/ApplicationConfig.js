const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
    commission: {
        type: Number,
        required: true
    }
});

const Config = mongoose.model("Config", configSchema);

module.exports = Config;