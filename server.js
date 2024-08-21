const express = require('express');
const path = require('path');
const app = express();
const connection = require('./App/Config/dbConfig');
const userController = require('./App/Controller/userController');

connection.connect((err) => {
    if(err) {
        console.error("Error connecting database", err.stack);
        return;
    }
    console.log("Connected to mysql database:", connection.threadId);

    if (connection.state === 'connected') {
        console.log('Database connection is active');
      } else {
        console.log('Database connection is not active.');
      }
});
  
app.use('/api/user', userController);
app.use('/Assets', express.static(path.join(__dirname, "Assets")));
app.use('/js', express.static(path.join(__dirname, "js")));


app.listen(3000, () => {
    console.log("Listening on port 3000...");
});