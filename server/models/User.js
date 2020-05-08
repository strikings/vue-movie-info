const Sequelize = require('sequelize')

// 第一步：引入MD5
const MD5 = require('crypto-js/md5')

// 第二步：自定义函数
function hashPassword(user,options) {
  if (user.changed('password')) {
    user.password = MD5(user.password).toString()
  }
}

module.exports = (sequelize, DataTypes) => {
  class Model extends Sequelize.Model { 
    // 第四步：自定方法：加密后的密码是否与数据库中的密码相同
    comparePassword (password) {
      return this.password === MD5(password).toString()
    }
  }

  // 初始值--数据库中的用户表 User
  Model.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 40]
      }
    }
  }, {
    // 第三步：使用钩子函数，调用自定义函数MD5加密
    hooks: {
      afterValidate: hashPassword
    },
    sequelize,
    modelName: 'User'
  })
  return Model
}