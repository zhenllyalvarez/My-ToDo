const express = require('express');
const path = require('path');
const app = express();
const userController = require('./App/Controller/userController');

// route
app.use(express.json());
app.use('/', userController);

// static files from asset
app.use('/Assets', express.static(path.join(__dirname, "Assets")));
app.use('/js', express.static(path.join(__dirname, "js")));

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Listening on port ${PORT}...`);
});

module.exports = app;