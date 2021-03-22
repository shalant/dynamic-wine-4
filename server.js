const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => 
    console.log('mongodb connection established'));

const articlesRouter = require('./routes/articles');
app.use('/articles', articlesRouter)

// added from github/fullstackreact at 958
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`app running on port ${port}`));