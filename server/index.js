const express = require('express');
const gzipStatic = require('connect-gzip-static');
const https = require("https");
const fs = require("fs");
const app = express();
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');
app.use(cors()).use(history()).use(gzipStatic(path.join(__dirname, '../frontend/dist')));
connect().use(path.join(__dirname, '../frontend/dist'))
//app.use(compression())//{
/*level: 6, // 压缩等级（0-9），默认值为 6
    threshold: 1024,
  brotli: {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11, // 设置压缩质量
    },
    mode: zlib.constants.BROTLI_MODE_TEXT, // 设置压缩模式
  }
}));*/
const httpsOption = {
	    key : fs.readFileSync("/root/private.key"),
	    cert: fs.readFileSync("/root/fullchain.crt")
}
const server = https.createServer(httpsOption, app)
server.listen(443, () => {
	console.log('listening on port 443.');
});
