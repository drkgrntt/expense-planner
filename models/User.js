const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true }
},
{
  usePushEach: true
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);
