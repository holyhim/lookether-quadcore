const { users } = require('../../models');

module.exports = {
  post: (req, res) => {
    const { email, password, username, gender } = req.body;

    users
      .findOrCreate({
        where: {
          email: email
        },
        defaults: {
          password: password,
          username: username,
          gender: gender
        }
      })
      .then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send('이미 존재하는 이메일 입니다.');
        }
        const data = await user.get({ plain: true });
        res.status(200).json(data);
      });
  }
};
