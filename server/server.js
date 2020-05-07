const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

// 测试接口
app.get('/api',(req,res)=>{
  res.send({
    msg: 'Hello World'
  })
})

// 接口
app.post('/users', (req, res) => {
  console.log(req.body)
  res.send({
    code: 200,
    data: req.body
  })
})

// 监听端口
app.listen(3000, () => {
  console.log('Server has been started on port 3000')
})
