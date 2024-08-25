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
    connection.query("INSERT INTO todo_list (todo, date) VALUES (?,?)", (err, results) => {
        if(err) {
            return res.status(500).json({error: "Failed to add data"});
        } else {
            res.json(results);
        }
    })
});

router.post('/api/todos/:id/status', async (req, res) => {
    const { id } = req.params;
    const { isDone } = req.body;

    const updateStatus = await doneToDo.findByIdUpdate(id, {completed: isDone}, { new: true});

    if(!updateStatus) {
        return res.status(404).json({ message: 'Todo not found' });
    } res.json(updateStatus);
});

module.exports = router;