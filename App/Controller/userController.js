const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, "index.html"))
});

module.exports = router;

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// });