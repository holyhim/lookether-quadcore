// TODO userinfo에 필요한 스키마정의

// * username, email, gender, password

module.exports = (sequelize, DataTypes) => {
    const userInfo = sequelize.define(
      'userInfo',
      { // email,password,username,mobile
        //TODO : userinfo에 테이블에 필요한 스키마를 정의 하세요
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        username: DataTypes.STRING,
        gender: DataTypes.STRING
      },
      {}
    );
    userInfo.associate = function(models) {
      // associations can be defined here
    };
    return userInfo;
  };
  