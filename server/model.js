const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/codehelp')
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: {
        type: String, set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    },
    avatar:String
});

const User = mongoose.model('User', UserSchema);

const QuestionSchema = new mongoose.Schema({
    votes: Number,
    answers: Number,
    views: Number,
    title: String,
    tags: Array,
    time: Number,
    user: Object,
    modified: Number
});

const Question = mongoose.model('Question', QuestionSchema);

const ContentSchema = new mongoose.Schema({
    question_id: String,
    title: String,
    content: String
});

const Content = mongoose.model('Content', ContentSchema);

module.exports = { User, Question, Content }