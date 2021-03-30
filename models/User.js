const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "One must have a name"]
    },
    username: {
        type: String,
        required: [true, "One must have an username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Must have an email"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address must be valid']
    },
    password: {
        type: String,
        required: [true, "A password is required"]
    }
});

UserSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', UserSchema);