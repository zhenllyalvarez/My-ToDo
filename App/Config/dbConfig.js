const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my_todo_app'
});

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

module.exports = connection;