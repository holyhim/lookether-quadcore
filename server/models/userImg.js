'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const userImg = sequelize.define(
    'userImg',
    {
      imgID: DataTypes.INTEGER,
      img: DataTypes.BLOB,
      like: DataTypes.INTEGER
    },
    {}
  );
  userImg.associate = function(models) {
    // associations can be defined here
    // userImg.belongsTo(models.userInfo, { foreignKey: 'imgID'})
  };
  return userImg
};

// userImg.associate = function(models) {
//   // associations can be defined here
//   userImg.belongsTo(models.userInfo, { foreignKey: 'imgID'})
// };