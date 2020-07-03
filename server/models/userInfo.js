'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userInfo.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userInfo',
  });
  return userInfo;
};

userInfo.associate = function(models) {
  // associations can be defined here
  userInfo.hasMany(models.userImg, { foreignKey: 'imgID'})
};