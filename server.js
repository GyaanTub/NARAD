// Jai Shree Krishna

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

app.use(cors()); // enable CORS for all routes

// Allowed years
const allowedYears = ['2020', '2021', '2022', '2023', '2024', '2025'];

// Serve static files (CSS, JS) directly from the root directory
app.use(express.static(path.join(__dirname)));

// Route for the main page (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/api/1D', (req, res) => {
    const stock = req.query.stock;
    const year = req.query.year;

    if (!stock) {
        return res.status(400).json({ error: 'Missing "stock" query parameter' });
    }

    if (!year || !allowedYears.includes(year)) {
        return res.status(400).json({ error: `Year must be one of: ${allowedYears.join(', ')}` });
    }

    const filePath = path.join(__dirname, 'data', 'Daily', stock, `${year}.csv`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: `File not found for stock "${stock}" in year "${year}"` });
    }

    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        })
        .on('error', (err) => {
            res.status(500).json({ error: 'Error reading CSV file', details: err.message });
        });
});

app.get('/api/backtest', (req, res) => {
    const stock = req.query.stock;
    const timeframe = req.query.tf;

    if (!stock) {
        return res.status(400).json({ error: 'Missing "stock" query parameter' });
    }

    const filePath = path.join(__dirname, 'data', 'backtest', stock, `${timeframe}.csv`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: `File not found for stock "${stock}"` });
    }

    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        })
        .on('error', (err) => {
            res.status(500).json({ error: 'Error reading CSV file', details: err.message });
        });
});

app.get('/api/valid', (req, res) => {
  res.send('yes');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
