'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const userInfo= sequelize.define(
    'userInfo',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      username: DataTypes.STRING
    },
    {}
  );
  userInfo.associate = function(models) {
    // userInfo.hasMany(models.userImg, { foreignKey: 'id'})
  }
  return userInfo
};

// userInfo.associate = function(models) {
//   // associations can be defined here
//   userInfo.hasMany(models.userImg, { foreignKey: 'imgID'})
// };