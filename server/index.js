const express = require('express');
//const mongoose = require('mongoose');
//const router = express.Router();
const path = require('path');
//const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(cors())//.use('/api',router);
//router.get('/list',(req,res)=>{
//	fs.readFile('/root/server/data.json',(err,data)=>{
//		res.json(JSON.parse(data));
//	})
//})
const history = require('connect-history-api-fallback');
app.use(history())
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.listen(80, () => {
	console.log('listening on port 80.');
});
//mongoose.connect('mongodb://localhost/codehelp',{useNewUrlParser:true})
//	.then(()=>console.log('success'))
//	.catch(err=>console.log(err,'faild'))