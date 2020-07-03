const { userInfo } = require('./models');
module.exports = {
  signInController: (req, res) => {
    // TODO : 로그인 및 인증 부여 로직 작성
    var session = req.session;
    var {email, password} = req.body; // 로그인 시에는 email이랑 password만 필요.

    userInfo
    .findOne({where : {email:email, password:password}}) //findOne: 찾는것 
    .then (result => {
      if(result){
        var {id} = result;
        session.userid = id;
        res.status(200).send({id}); // 있으면 200
      } else{
        res.status(404).send('아이디와 비밀번호를 확인해주세요'); // 없으면 404 & unvalid user
      }
    })
    .catch(err =>{
      res.status(500).send(err);
    })
  },
  signUpController: (req, res) => {  // findOrCreate :찾아서 없으면 만들어라 where이 기준점
    // TODO : 회원가입 로직 및 유저 생성 로직 작성
    const{email, password, username, gender} = req.body; //body에 필요한 것들 >> 테케에 나와있음
    userInfo
    .findOrCreate({where :{email : email}, defaults: {username, password, gender}}) // 없으면 defaults를 생성해라
    .then(([result, created])=>{  // then promise 
      if(created){ 
        res.status(201).send(result); //성공했으니 201띄우고 값보내기 (post 성공상태코드)
      } else {
        res.status(409).send('이미 존재하는 이메일 입니다.'); 
      }
    }).catch(err=>{
      res.status(500).send(err);
    })
  },
  signOutController: (req, res) => {
    const sess = req.session; // session 정보를 가져온다 ( 이 경우는 데이터를 넘겨주지 않아도 이미 생성된 session값이 존재하기 때문에 생성을 하지않고 데이터를 반환)

    if (sess.userid) {
      // 로그인(세션 생성)이 되지않은 상태에서 불러오면 userid값이 존재하지 않는다
      req.session.destroy(err => {
        // session을 제거하기 위한 함수로 인자는 function을 넘겨주면 된다
        if (err) {
          console.log(err);
        } else {
          res.redirect('/'); // session이 성공적으로 존재하며 session 삭제가 완료되면 클라이언트에서 다시 `${URL}/`로 페이지를 이동시킨다
        }
      });
    } else {
      res.redirect('/');
    }
  },
  userContoroller: (req, res) => {
    // TODO : 유저 회원정보 요청 로직 작성
    const { userid } = req.session
    if( userid ){ // id 존재 => findOne으로 id가 userid인지 판단
      user
      .findOne({where : {id : userid}})
      .then(result=>{
        if( result) { // 위 검색이 존재하면
          res.status(200).send(result); //200보내고 result를 databasedp에 전송
        } else {
          res.status(401).send(err); // 실패시 401 and err 전송
        }
      }).catch(err=>{
        res.status(500).send(err);
      })
    } else {
      res.status(401).end();
    }
  },
};
