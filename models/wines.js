const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wineSchema = new Schema({
    winery: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    articleImage: { type: String, required: true },
    postDate: { type: Date, default: Date.now }
})

const Wines = mongoose.model('Wines', wineSchema);

module.exports = Wines;