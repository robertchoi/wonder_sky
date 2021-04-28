const express = require("express");
var mysql = require("mysql"); // mysql 모듈을 불러옵니다.
var connection = mysql.createConnection({
  host: "ec2-13-125-221-229.ap-northeast-2.compute.amazonaws.com",
  user: "root",
  password: "root1234",
  database: "board_db",
  insecureAuth: true
});

connection.connect(function(err) {
  if (err) {
    throw err; // 접속에 실패하면 에러를 throw 합니다.
  } else {
    // 접속시 쿼리를 보냅니다.
    connection.query("SELECT * FROM score", function(err, rows, fields) {
      console.log(rows); // 결과를 출력합니다!
    });
  }
});

const app = express();

const port = 3001;

app.set("port", port);

app.get("/", (req, res) => {
  res.send("Hello world!");
});


// Creating a GET route that returns data from the 'users' table.
app.get('/score', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query (select all data from the 'users' table).
  connection.query('SELECT * FROM score', function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
  });
});
});


app.listen(port, () => console.log("Listening on", port));

module.exports = app;
