const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const allowedYears = ['2020', '2021', '2022', '2023', '2024', '2025'];

module.exports = (req, res) => {
  const { stock, year } = req.query;

  if (!stock) {
    return res.status(400).json({ error: 'Missing "stock" query parameter' });
  }

  if (!year || !allowedYears.includes(year)) {
    return res.status(400).json({ error: `Year must be one of: ${allowedYears.join(', ')}` });
  }

  // Define the file path for the CSV
  const filePath = path.join(__dirname, '..', 'data', 'Daily', stock, `${year}.csv`);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `File not found for stock "${stock}" in year "${year}"` });
  }

  const results = [];

  // Read the CSV file
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results); // Send the CSV data as a response
    })
    .on('error', (err) => {
      res.status(500).json({ error: 'Error reading CSV file', details: err.message });
    });
};
