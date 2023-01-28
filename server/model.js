const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/codehelp')
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: {
        type: String, set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User }