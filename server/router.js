// 引入controller文件夹里面的文件
const UserController = require('./controllers/UserController.js')

// 引入token校验
const AuthenticatePolicy = require('./policies/AuthenticatePolicy')

module.exports = (app) => {
  // 测试接口
  app.get('/api', (req, res) => {
    res.send({
      msg: 'Hello World'
    })
  })

  // post测试接口
  app.post('/uapi', (req, res) => {
    console.log(req.body)
    res.send({
      code: 200,
      data: req.body
    })
  })

  // 登录
  app.post('/users/login', UserController.login)

  // 注册
  app.post('/users', UserController.register)

  // 根据id查询用户信息--token认证
  app.get('/users/:id', AuthenticatePolicy.isValidToken,UserController.getUserById)

  // 根据id更新用户信息
  app.put('/users/:id', UserController.update)

  // 根据id删除用户信息
  app.delete('/users/:id', UserController.delete)
}