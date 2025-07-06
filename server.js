const express = require('express');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());  // Enable CORS for frontend access

// Route to serve CSV data as JSON
app.get('/api/1D/2025', (req, res) => {
    const stockName = req.query.stock;
    const results = [];
    
    // Use absolute path to the CSV file
    const filePath = path.join(__dirname, 'files', 'Daily', stockName, '2025.csv');

    fs.createReadStream(filePath)  // Path to your CSV file
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);  // Send JSON response
        })
        .on('error', (err) => {
            console.error(err);
            res.status(500).send('Error reading CSV file');
        });
});

app.get('/api/1D/2024', (req, res) => {
    const stockName = req.query.stock;
    const results = [];
    
    // Use absolute path to the CSV file
    const filePath = path.join(__dirname, 'files', 'Daily', stockName, '2024.csv');

    fs.createReadStream(filePath)  // Path to your CSV file
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);  // Send JSON response
        })
        .on('error', (err) => {
            console.error(err);
            res.status(500).send('Error reading CSV file');
        });
});

app.get('/api/1D/2023', (req, res) => {
    const stockName = req.query.stock;
    const results = [];
    
    // Use absolute path to the CSV file
    const filePath = path.join(__dirname, 'files', 'Daily', stockName, '2023.csv');

    fs.createReadStream(filePath)  // Path to your CSV file
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);  // Send JSON response
        })
        .on('error', (err) => {
            console.error(err);
            res.status(500).send('Error reading CSV file');
        });
});

app.get('/api/1D/2022', (req, res) => {
    const stockName = req.query.stock;
    const results = [];
    
    // Use absolute path to the CSV file
    const filePath = path.join(__dirname, 'files', 'Daily', stockName, '2022.csv');

    fs.createReadStream(filePath)  // Path to your CSV file
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);  // Send JSON response
        })
        .on('error', (err) => {
            console.error(err);
            res.status(500).send('Error reading CSV file');
        });
});

app.get('/api/1D/2021', (req, res) => {
    const stockName = req.query.stock;
    const results = [];
    
    // Use absolute path to the CSV file
    const filePath = path.join(__dirname, 'files', 'Daily', stockName, '2021.csv');

    fs.createReadStream(filePath)  // Path to your CSV file
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);  // Send JSON response
        })
        .on('error', (err) => {
            console.error(err);
            res.status(500).send('Error reading CSV file');
        });
});

app.get('/api/1D/2020', (req, res) => {
    const stockName = req.query.stock;
    const results = [];
    
    // Use absolute path to the CSV file
    const filePath = path.join(__dirname, 'files', 'Daily', stockName, '2020.csv');

    fs.createReadStream(filePath)  // Path to your CSV file
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);  // Send JSON response
        })
        .on('error', (err) => {
            console.error(err);
            res.status(500).send('Error reading CSV file');
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
