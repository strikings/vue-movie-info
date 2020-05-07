const Sequelize = require('sequelize')

module.exports = (sequelize,DataTypes) =>{
  class Model extends Sequelize.Model {}

  // 初始值
  Model.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validatae: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8,40]
      }
    }
  },{
    sequelize,
    modelName: 'User'
  })
  return Model
}