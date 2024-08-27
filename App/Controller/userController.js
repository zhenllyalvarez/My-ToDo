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

router.post('/api/todos/add', (req, res) => {
    const { todo, date } = req.body;
    const query = "INSERT INTO todo_list (todo, date) VALUES (?, ?)";
    const values = [todo, date]; 
    if (!todo || !date) {
        return res.status(400).json({ error: "Todo and date are required" });
    }
    console.log("Received data:", { todo, date });
    connection.query(query, values, (err, results) => {
        if(err) {
            return res.status(500).json({error: "Failed to add data"});
        } else {
            res.json(results);
        }
    })
});

router.post('/api/todos/:id/remove', (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM todo_list WHERE id = ?";

    connection.query(query, [id], (err, results) => {
        if(err) {
            return res.status(500).json({error: "Failed to remove data"});
        } else {
            console.log("Successfully deleted");
            res.json(results);
        }
    });
});


router.put('/api/todos/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    console.log(`Received status: ${status} for ID: ${id}`);

    const query = "UPDATE todo_list SET status = ? WHERE id = ?";
    connection.query(query, [parseInt(status), id], (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Failed to update status" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json({ message: "Status updated successfully" });
    });
});



module.exports = router;