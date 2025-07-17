const https = require('https');
const csv = require('csv-parser');

module.exports = (req, res) => {
  
  const allowedOrigins = [
    'https://sankhya-six.vercel.app',
    'https://quantvidya.vercel.app'
  ];

  // const origin = req.headers.origin;
  // if (allowedOrigins.includes(origin)) {
    // res.setHeader('Access-Control-Allow-Origin', origin);
  // }

  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { stock } = req.query;

  if (!stock) {
    return res.status(400).json({ error: 'Missing "stock" query parameter' });
  }

  const url = `https://raw.githubusercontent.com/GyaanTub/NARAD/main/data/backtest/${stock}/60m.csv`;
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
