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

app.listen(port, () => console.log("Listening on", port));

module.exports = app;
