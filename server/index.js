const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');
app.use(cors()).use(history()).use(express.static(path.join(__dirname, '../frontend/dist')));

app.listen(80, () => {
	console.log('listening on port 80.');
});