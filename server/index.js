const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const spdy = require('spdy');

const sslOptions = {
  key: fs.readFileSync('/root/private.key'),
  cert: fs.readFileSync('/root/cert.crt')
};

const compression = require('compression');
app.use(compression());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

spdy.createServer(sslOptions, app).listen(443, () => {
  console.log('Server running on port 443.');
});

