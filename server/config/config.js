// {
//   "development": {
//     "username": "root",
//     "password": MYSQL_PASSWORD,
//     "database": "user",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
// }

module.exports = {
  development: {
    username: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'user',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  },
  awsConfig:{
    secretAccessKey:'9I8XVMmLQuXQ8v5dAoLBIQPBtwhv8AMipNOG7C4h',
    accessKeyId: 'AKIAJUODYZMRGXXFTE4Q',
    region: 'ap-northeast-2'
  }
};
