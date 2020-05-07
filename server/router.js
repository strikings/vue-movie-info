// 引入controller文件夹里面的文件
const UserController = require('./controllers/UserController.js')

module.exports = (app) => {
  // 测试接口
  app.get('/api', (req, res) => {
    res.send({
      msg: 'Hello World'
    })
  })

  // post测试接口
  app.post('/uapi', (req, res) => {
    res.send({
      msg: 'ok'
    })
  })

  // 注册
  app.post('/user', UserController.register)

  // 根据id查询用户信息
  app.get('/users/:id', UserController.getUserById)

  // 根据id更新用户信息
  app.put('/users/:id', UserController.update)

  // 根据id删除用户信息
  app.delete('/users/:id', UserController.delete)
}