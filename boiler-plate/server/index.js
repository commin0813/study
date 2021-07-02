const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require("./models/User")
const { auth } = require("./middleware/auth")

const config = require('./config/key')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

const mongoose = require('mongoose')



mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  }).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 ggg22')
})

app.post('/api/users/register', (req, res) => {
  // 회원가입할때 필요한 정보
  console.log(req.body)
  const user = new User(req.body)
  // console.log(user)
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json(
        {
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        }
      )
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: '비밀번호가 틀렸습니다.'
          })
        } else {
          // 토큰 생성
          user.generateToken((err, user) => {
            if (err) {
              return res.status(400).send(err);
            }
            // 토큰을 저장한다. 쿠키 or 로컬 스토리지 or session
            console.log("Login Success")
            res.cookie("x_auth", user.token)
              .status(200)
              .json({
                loginSuccess: true,
                userId: user._id
              })
          })
        }
      })
    }
  })
})


app.get('/api/users/auth', auth, (req, res) => {

  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    token: req.token
  })

})


app.get('/api/users/logout', auth, (req, res) => {

  User.findOneAndUpdate({ _id: req.user.id },
    { token: "" },
    (err, cb) => {
      if (err) return res.json({ success: false, err })
      res.status(200).send({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})