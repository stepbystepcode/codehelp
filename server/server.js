//Express app
const express = require("express");
const app = express();

//jwt token auth
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

//mongoose model
const { User, Question, Content } = require("./model.js");

//axios
const axios = require("axios");
const cors = require("cors");

//Create app
app.use(cors());

//avatar
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/avatar/:id", (req, res) => {
  const imagePath = path.join(__dirname, "img", req.params.id);
  res.sendFile(imagePath);
});

//Signup & Login
app.post("/api/signup", async (req, res) => {
  const secret_key = process.env.SECRET_KEY;
  const token = req.body.token;
  const url = `https://www.recaptcha.net/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
  axios.post(url).then(async (response) => {
    //console.log(response.data);
    if (response.data.success) {
      const find = await User.findOne({
        username: req.body.username,
      });
      if (!find) {
        const user = await User.create({
          username: req.body.username,
          password: req.body.password,
          avatar: "http://47.93.214.2:3000/avatar/avatar.svg",
        });
        res.send({ message: "注册成功", icon: "success", user: user });
      } else {
        res.send({ message: "用户名已存在", icon: "error" });
      }
    }
  });
});
app.post("/api/login", async (req, res) => {
  const secret_key = "6LfLxjEkAAAAAN9SQ6dmt5RJknZqkmDcQJNrFcz0";
  const token = req.body.token;
  const url = `https://www.recaptcha.net/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
  axios.post(url).then(async (response) => {
    // console.log(response.data);
    if (response.data.success) {
      const user = await User.findOne({
        username: req.body.username,
      });
      if (!user) {
        res.send({ message: "用户名不存在", success: false });
      }
      const isPasswordValid = require("bcrypt").compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        //return res.status(422).send({ message: '密码错误' })
        res.send({ message: "密码错误", icon: "error" });
      } //else { res.send({ message: '登录成功', icon: "success" }) }
      else {
        const token = jwt.sign(
          {
            id: String(user._id),
          },
          SECRET
        );
        res.send({
          message: "登录成功",
          icon: "success",
          user,
          token,
        });
      }
    }
  });
});

//jwt auth
const auth = async (req, res, next) => {
  const raw = String(req.headers.authorization).split(" ").pop();
  try {
    const { id } = jwt.verify(raw, SECRET);
    req.user = await User.findById(id);
    next();
  } catch (error) {
    res.send({ message: "error" });
  }
};
app.get("/api/auth", auth, async (req, res) => {
  res.send(req.user);
});

//page api
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get("/api/questions", async (req, res) => {
  const questions = await Question.find();
  res.send(questions);
});

app.get("/api/detail", async (req, res) => {
  const { query } = req;
  const content = await Content.find({ question_id: query.id });
  Question.findByIdAndUpdate(
    query.id,
    { $inc: { views: 1 } },
    (err, question) => {
      if (err) {
        res.send(err);
      } else {
        res.send(content);
      }
    }
  );
});

//ask & answer
app.post("/api/ask", async (req, res) => {
  const question = await Question.create({
    title: req.body.title,
    tags: req.body.tags,
    user: req.body.user,
    views: req.body.views,
    answers: req.body.answers,
    modified: req.body.modified,
    time: req.body.time,
    votes: req.body.votes,
  });
  await Content.create({
    question_id: question._id,
    content: req.body.content,
  });
});

app.post("/api/answer", async (req, res) => {
  await Content.create({
    question_id: req.body.question_id,
    content: req.body.content,
  });
  Question.findByIdAndUpdate(
    req.body.question_id,
    { $inc: { answers: 1 } },
    (err, question) => {
      if (err) {
        res.send(err);
      } else {
        res.send("ok");
      }
    }
  );
});

//upload
const multer = require("multer");
const { resourceLimits } = require("worker_threads");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./img");
    },
    filename: function (req, file, cb) {
      cb(null, req.body.fileName);
    },
  }),
});
app.post("/api/upload", upload.single("avatar"), (req, res) => {
  const name = req.body.fileName.substring(
    0,
    req.body.fileName.lastIndexOf(".")
  );
  console.log(name);
  User.findOneAndUpdate(
    {
      username: {
        $gte: name,
      },
    },
    { avatar: "http://47.93.214.2:3000/avatar/" + req.body.fileName },
    null,
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        // console.log("Original Doc : ", docs);
      }
    }
  );
  // const a = User.find(
  //   {
  //     name: {
  //       $gte: req.body.fileName.substring(
  //         0,
  //         req.body.fileName.lastIndexOf(".")
  //       ),
  //     },
  //   })
  // 	console.log(a);
  res.send("success");
});

//info
app.get("/api/info", (req, res) => {
  const { query } = req;
  Question.findById(query.id, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/like", async (req, res) => {
  const { query } = req;
  const content = await Content.findById(query.id);
  if (content.likes.indexOf(query.user) != -1) {
    res.send("您已经赞过了");
  } else {
    content.likes.push(query.user);
    await content.save();
    res.send(content);
  }
});

//listen on port
app.listen(3000, () => {
  console.log("listening on port 3000.");
});
