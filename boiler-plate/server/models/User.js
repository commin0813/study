const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    var user = this;
    console.log(user.isModified('password'))
    if (user.isModified('password')) {// 비밀번호가 변경될때만 비밀번호를 암호화 해준다.
        // 비밀번호를 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash;
                console.log(user.password)
                next()
            })
        });
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (plainPssword, cb) {
    bcrypt.compare(plainPssword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        console.log("comaprePassword success")
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    // jsonWebToken을 이용해서 

    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token;


    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    })

}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, 'secretToken', function (err, decoded) {
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })

}

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}