const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require("./models/User")

const config = require('./config/key')

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

const mongoose = require('mongoose')



mongoose.connect(config.mongoURI,
{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
.catch(err=> console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 ggg22')
})

app.post('/register',(req,res)=>{
  // 회원가입할때 필요한 정보
  console.log(req.body)
  const user = new User(req.body)
  // console.log(user)
  user.save((err,userInfo)=>{
    if(err) return res.json({success : false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})  