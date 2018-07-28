const express = require('express');
const router = express.Router();

router.get('/', (requestAnimationFrame, res) => {
    res.send('hello');
});

module.exports = router;
