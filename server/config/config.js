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
  }
};
