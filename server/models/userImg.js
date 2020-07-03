'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userImg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userImg.init({
    imgID: DataTypes.INTEGER,
    img: DataTypes.BLOB,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userImg',
  });
  return userImg;
};

userImg.associate = function(models) {
  // associations can be defined here
  userImg.belongsTo(models.userInfo, { foreignKey: 'imgID'})
};