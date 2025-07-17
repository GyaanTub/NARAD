const https = require('https');
const csv = require('csv-parser');

const allowedYears = ['2020', '2021', '2022', '2023', '2024', '2025'];

const allowedOrigins = [
  'https://sankhya-six.vercel.app',
  'https://quantvidya.vercel.app',
  '*'
];

module.exports = (req, res) => {
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  const { stock, year } = req.query;

  if (!stock) {
    return res.status(400).json({ error: 'Missing "stock" query parameter' });
  }

  if (!year || !allowedYears.includes(year)) {
    return res.status(400).json({ error: `Year must be one of: ${allowedYears.join(', ')}` });
  }

  const url = `https://raw.githubusercontent.com/GyaanTub/NARAD/main/data/Daily/${stock}/${year}.csv`;
  const results = [];

  https.get(url, (response) => {
    if (response.statusCode !== 200) {
      return res.status(404).json({ error: `File not found for stock "${stock}" in year "${year}"` });
    }

    response
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.json(results);
      })
      .on('error', (err) => {
        res.status(500).json({ error: 'Error parsing CSV file', details: err.message });
      });
  }).on('error', (err) => {
    res.status(500).json({ error: 'Error fetching CSV file', details: err.message });
  });
};
