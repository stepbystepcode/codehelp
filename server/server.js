//Express app
const express = require("express");
const app = express();
const zlib = require('zlib');
const compression = require('compression');
const brotli = require('brotli');
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      // 不对特定的请求进行压缩
      return false;
    }

    return compression.filter(req, res);
  },
  brotli: {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11, // 设置压缩质量
    },
    mode: zlib.constants.BROTLI_MODE_TEXT, // 设置压缩模式
  }
}));

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
const fs = require("fs");
const https = require("https");
const httpsOption = {
	            key : fs.readFileSync("/root/private.key"),
	            cert: fs.readFileSync("/root/fullchain.crt")
}
const server = https.createServer(httpsOption, app)
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

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

//upload & avatar
const sharp = require("sharp");
const multer = require("multer");
const path = require("path");

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
  const fullName = req.body.fileName;
  const name = fullName.substring(0, fullName.lastIndexOf("."));

  async function convertImage(src, dst) {
    const image = sharp(src);
    const resizedImage = await image
      .resize({ width: 256, height: 256, withoutEnlargement: true })
      .toFormat("webp")
      .webp({ quality: 100 })
      .toBuffer();
    fs.writeFileSync(dst, resizedImage);
  }
  convertImage("./img/" + fullName, "./img/" + name + ".webp").then((res) => {
    if (fullName.substring(fullName.lastIndexOf(".") + 1) != "webp") {
      fs.unlink("./img/" + fullName, (err) => {
        if (err) throw err;
      });
    }
  });
});

//上传文章图片
const upload2 = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(null, req.body.fileName);
    },
  }),
});
app.post("/api/upload2", upload2.single("image"), (req, res) => {
  res.send({ url: "https://www.codehelp.cn:3000/upload/" + req.body.fileName });
});
//upload req
app.get("/upload/:id", (req, res) => {
  const imagePath = path.join(__dirname, "upload", req.params.id);
  fs.stat(imagePath, (err, stats) => {
    if (err) {
      return res.send(err);
    }
    res.sendFile(imagePath);
  });
});

// User.findOneAndUpdate(
//   {
//     username: {
//       $gte: name,
//     },
//   },
//   { avatar: "http://47.93.214.2:3000/avatar/" + req.body.fileName },
//   null,
//   function (err, docs) {
//     if (err) {
//       console.log(err);
//     } else {
//       // console.log("Original Doc : ", docs);
//     }
//   }
// );
//avatar
// app.get("/avatar/:id", (req, res) => {
//   const imagePath = path.join(__dirname, "img", req.params.id);
//   fs.stat(imagePath, (err, stats) => {
//     if (err) {
//       return res.sendFile(path.join(__dirname, "img", "avatar.svg"));
//     }
//     res.sendFile(imagePath);
//   });
// });
app.post("/api/avatar", (req, res) => {
  console.log(req.body.name);
  console.log(req.body.data);
  User.findOneAndUpdate(
    { username: req.body.name }, // 筛选条件
    { $set: { avatar: req.body.data } }, // 更新操作
    { new: true }, // 返回更新后的文档
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    }
  );
  res.send("ok");
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
  const lod = query.lod;
  if (lod == 1) {
    if (content.likes.indexOf(query.user) != -1) {
      res.send({ info: "您已经赞过了" });
    } else {
      const index = content.dislikes.indexOf(query.user);
      if (index != -1) {
        content.dislikes.splice(index, 1);
      }
      content.likes.push(query.user);
      await content.save();
      res.send({ info: "like" });
    }
  } else {
    if (content.dislikes.indexOf(query.user) != -1) {
      res.send({ info: "您已经踩过了" });
    } else {
      const index = content.likes.indexOf(query.user);
      if (index != -1) {
        content.likes.splice(index, 1);
      }
      content.dislikes.push(query.user);
      await content.save();
      res.send({ info: "dislike" });
    }
  }
});

//listen on port
server.listen(3000, () => {
  console.log("listening on port 3000.");
});
