const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
    },
    {
        timestamps: true
    });


userSchema.pre('save',  (next) => {
    const user = this;
    // TODO : Fix hash password
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        console.log(error);
        next();
    })
});

const User = mongoose.model('User', userSchema);

module.exports = User;