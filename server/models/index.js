const path = require('path')
const fs = require('fs')
// 导入数据库
const config = require('../config')
const Sequelize = require('sequelize')

const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options
)

/**
 * 读取当前目录：除index.js文件之外，循环遍历models文件中的所有文件，进行导出操作；然后将model存放在db中，进行统一导出
*/
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
