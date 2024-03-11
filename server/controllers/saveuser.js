// saveuser.js

const mysql = require('mysql');
const env = require('../env.js');
const config = require('../dbconfig.js')[env];

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  port: config.port,
  password: config.password,
  database: config.database
});

connection.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL:', err);
  } else {
      console.log('Connected to MySQL');
  }
});

function saveUserData(userData) {
  const { gender, name, location, email, login, picture ,dob} = userData;
  const { title, first, last } = name;
  const { country } = location;
  const { username, password, md5, sha1, sha256, uuid } = login;
  const { medium, large, thumbnail } = picture;
  const dateOfBirth = new Date(dob.date).toISOString().slice(0, 19).replace('T', ' '); // แปลงรูปแบบของวันเกิด

  console.log(userData);

  const sql = 'INSERT INTO users SET ?';
  const values = {gender, title, first, last, country,dob:dateOfBirth, uuid, email, username, password, md5, sha1, sha256, picture_large:large, picture_medium:medium, picture_thumbnail:thumbnail};

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      return console.error('Error saving user data:', error.message);
    }
    console.log('User data saved successfully!');
  });
}

module.exports = saveUserData;