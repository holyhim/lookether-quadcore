// TODO: userImg에 필요한 스키마 정의

//* imgId, like  --> database


module.exports = (sequelize, DataTypes) => {
  const userImg = sequelize.define(
    'userImg',
    { // email,password,username,mobile
      //TODO : user 테이블에 필요한 스키마를 정의 하세요
      imgID: DataTypes.INTEGER,
      img: DataTypes.BLOB,
      like: DataTypes.INTEGER
    },
    {}
  );
  userImg.associate = function(models) {
    // associations can be defined here
  };
  return userImg;
};

