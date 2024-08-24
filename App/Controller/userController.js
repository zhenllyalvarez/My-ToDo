const express = require('express');
const router = express.Router();
const path = require("path");
const connection = require('../Config/dbConfig');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

router.get('/api/todos', (req, res) => {
    connection.query("SELECT * FROM todo_list", (err, results) => {
        if(err) {
            return res.status(500).json({ error: "Failed to retrieve data" });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;