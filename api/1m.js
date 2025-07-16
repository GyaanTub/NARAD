const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = (req, res) => {
  const { stock} = req.query;

  if (!stock) {
    return res.status(400).json({ error: 'Missing "stock" query parameter' });
  }

  const filePath = path.join(__dirname, '..', 'data', 'backtest', stock, `1m.csv`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `File not found for stock "${stock}"` });
  }
const https = require('https');
const csv = require('csv-parser');

module.exports = (req, res) => {
  const { stock } = req.query;

  if (!stock) {
    return res.status(400).json({ error: 'Missing "stock" query parameter' });
  }

  const url = `https://raw.githubusercontent.com/GyaanTub/NARAD/main/data/backtest/${stock}/1m.csv`;
  const results = [];

  https.get(url, (stream) => {
    stream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.json(results);
      })
      .on('error', (err) => {
        res.status(500).json({ error: 'Error parsing CSV data', details: err.message });
      });
  }).on('error', (err) => {
    res.status(500).json({ error: 'Error fetching CSV file', details: err.message });
  });
};

  const results = [];

  // Read the CSV file
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results); // Send the backtest data as a response
    })
    .on('error', (err) => {
      res.status(500).json({ error: 'Error reading CSV file', details: err.message });
    });
};
