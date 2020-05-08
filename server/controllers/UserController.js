const { User } = require('../models')

// JWT第一步：引入config
const config = require('../config')

// JWT第二步：引入JWT
const Jwt = require('jsonwebtoken')

// JWT第三步：自定义函数
function tokenSign(id, email) {
  try {
    return Jwt.sign({ id, email }, config.token.secretOrPrivateKey, config.token.options)
  } catch (error) {
    throw (error)
  }
}

module.exports = {

  // 登录
  async login(req, res) {
    try {
      // findOne 查找数据库表内数据，判断该邮箱用户是否已经注册（先注册才能登录）
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      // 密码对比：加密后的密码是否与数据库中的密码相同；方法定义在User.js中
      let isValidPassword = user.comparePassword(req.body.password)
      if (isValidPassword) {
        res.send({
          user: user.toJSON(),
          // JWT第四步：调用自定义函数
          token: tokenSign(user)
        })
      }
    } catch (error) {
      res.status(403).send({
        code: 403,
        error: '用户名或密码错误'
      })
    }
  },


  // 注册
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      res.status(201).send({
        user,
        // JWT第四步：调用自定义函数
        token: tokenSign(user)
      })
    } catch (error) {
      res.status(400).send({
        code: 400,
        error: '该邮箱已经注册'
      })
    }
  },
  // 通过主键来查询一条记录：await User.findByPk(req.params.id)
  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id)
      if (user) {
        res.status(200).send({
          user
        })
      } else {
        res.status(400).send({
          code: 400,
          error: '没有找到对应的数据'
        })
      }
    } catch (error) {
      res.status(500).send({
        code: 500,
        error: '数据查询失败'
      })
    }
  },
  // 更新用户信息
  async update(req, res) {
    try {
      await User.update(
        req.body,
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.status(200).send({
        message: '数据更新成功'
      })
    } catch (error) {
      res.status(500).send({
        code: 500,
        error: '数据更新失败'
      })
    }
  },
  // 根据id删除用户信息
  async delete(req, res) {
    try {
      await User.destroy(
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.status(200).send({
        message: '数据删除成功'
      })
    } catch (error) {
      res.status(500).send({
        code: 500,
        error: '数据删除失败'
      })
    }
  }
}