require('dotenv').config();
const { User, Question } = require('./model.js')
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const axios = require('axios')
const fs = require('fs');
const cors = require('cors');
const SECRET = process.env.SECRET;
app.use(cors()).use(express.json())
// app.get('/api/questions', (req, res) => {
// 	fs.readFile('/root/codehelp/server/data.json', (err, data) => {
// 		res.json(JSON.parse(data));
// 	})
// })
app.get('/api/users', async (req, res) => {
	const users = await User.find();
	res.send(users);
})
app.get('/api/questions', async (req, res) => {
	const questions = await Question.find();
	res.send(questions);
})
app.post('/api/signup', async (req, res) => {
	const secret_key = process.env.SECRET_KEY;
	const token = req.body.token;
	const url = `https://www.recaptcha.net/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
	axios.post(url)
		.then(async response => {
			console.log(response.data);
			if (response.data.success) {
				const find = await User.findOne({
					username: req.body.username
				})
				if (!find) {
					const user = await User.create({
						username: req.body.username,
						password: req.body.password,
					});
					res.send({ message: '注册成功', icon: "success" });
				} else {
					res.send({ message: '用户名已存在', icon: "error" })
				}

			}
		})


})
app.post('/api/login', async (req, res) => {
	const secret_key = "6LfLxjEkAAAAAN9SQ6dmt5RJknZqkmDcQJNrFcz0";
	const token = req.body.token;
	const url = `https://www.recaptcha.net/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
	axios.post(url)
		.then(async response => {
			console.log(response.data);
			if (response.data.success) {
				const user = await User.findOne({
					username: req.body.username
				})
				if (!user) {
					res.send({ message: '用户名不存在', success: false })
				}
				const isPasswordValid = require('bcrypt').compareSync(
					req.body.password,
					user.password
				)
				if (!isPasswordValid) {
					//return res.status(422).send({ message: '密码错误' })
					res.send({ message: '密码错误', icon: "error" })
				} //else { res.send({ message: '登录成功', icon: "success" }) }

				const token = jwt.sign({
					id: String(user._id),
				}, SECRET)
				res.send({
					message: '登录成功', icon: "success",
					user,
					token
				});
			}
		})
})

const auth = async (req, res, next) => {
	const raw = String(req.headers.authorization).split(' ').pop();
	const { id } = jwt.verify(raw, SECRET)
	req.user = await User.findById(id)
	next()
}

app.get('/api/profile', auth, async (req, res) => {
	res.send(req.user)
})

app.listen(3000, () => {
	console.log('listening on port 3000.');
});