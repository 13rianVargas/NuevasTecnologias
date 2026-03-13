const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.   ');
    });

app.listen(port, () => {
    console.log(`Zoológico API escuchando en http://localhost:${port}`);
    });