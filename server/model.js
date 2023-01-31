require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const MONGOOSE_USER = process.env.MONGOOSE_USER;
const MONGOOSE_PASS = process.env.MONGOOSE_PASS;
mongoose.connect(MONGOOSE_URL, {
  authSource: "codehelp",
  user: MONGOOSE_USER,
  pass: MONGOOSE_PASS,
});
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String,
    set(val) {
      return require("bcrypt").hashSync(val, 10);
    },
  }
});

const User = mongoose.model("User", UserSchema);

const QuestionSchema = new mongoose.Schema({
  votes: Number,
  answers: Number,
  views: Number,
  title: String,
  tags: Array,
  time: Number,
  user: Object,
  modified: Number,
});

const Question = mongoose.model("Question", QuestionSchema);

const ContentSchema = new mongoose.Schema({
  question_id: String,
  content: String,
  likes: Array,
});

const Content = mongoose.model("Content", ContentSchema);

module.exports = { User, Question, Content };
