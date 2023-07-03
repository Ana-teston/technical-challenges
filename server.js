const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/data.json', async (req, res) => {
    try {
        const { default: fetch } = await import('node-fetch');
        const response = await fetch('https://gitlab.com/-/snippets/2149167/raw/main/data.json');
        const data = await response.json();
        res.json(data);
    } catch (e) {
        console.log('error', e);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
