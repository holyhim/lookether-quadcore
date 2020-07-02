const { user } = require('../../models');

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    var sess = req.session; 
    user
      .findOne({
        where: {
          email: email,
          password: password
        }
      })
      .then(result => {
        if (result === null) {
          res.status(404).send('아이디와 비밀번호를 다시 확인해 주세요');
        } else {
          sess.userid = result.id; 
          res.status(200).json({
            id: result.id
          });
        }
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
};
