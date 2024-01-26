var createError = require('http-errors');
require('dotenv').config()
const cors = require('cors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
// MySQL接続の設定
var connection = mysql.createConnection({
  host     : "db", // Docker Composeファイルで指定したMySQLサービスの名前
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
});

// MySQLに接続
connection.connect(function(err) {
  if (err) {
    console.error('MySQL connection error: ' + err.stack);
    return;
  }

  console.log('Connected to MySQL as id ' + connection.threadId);
  // MySQLクエリを実行
  
})
app.post('/users', (req, res) => {
  const { name, language,  age } = req.body;
  console.log(req,"req")

  // データベースへの新規データ挿入
  connection.query('INSERT INTO users (name, language,  age) VALUES (?, ?,  ?)', [name, language,  age], (insertError, insertResults) => {
    if (insertError) {
      console.error('Error inserting user:', insertError);
      res.status(500).json({ error: 'Error inserting user.' });
    } else {
      console.log('User inserted successfully.');

      // データベースから全ユーザー情報を取得してクライアントに返す
      connection.query('SELECT * FROM users', (selectError, selectResults) => {
        if (selectError) {
          console.error('Error fetching users:', selectError);
          res.status(500).json({ error: 'Error fetching users.' });
        } else {
          res.json(selectResults);
        }
      });
    }
  });
});
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, selectResults) => {
    if (error) {
      res.status(500).json({ error: 'Error fetching users.' });
    } else {
      // SELECTクエリの結果をJSON形式で返す
      res.json(selectResults);

      // // INSERTクエリを実行
      // connection.query('INSERT INTO users (id, name, language) VALUES (2, "taro", "python")', (insertError, insertResults) => {
      //   if (insertError) {
      //     console.error('Error inserting user:', insertError);
      //   } else {
      //     console.log('User inserted successfully.');
          
      //     // DELETEクエリを実行
      //     connection.query('DELETE FROM users WHERE id = 2', (deleteError, deleteResults) => {
      //       if (deleteError) {
      //         console.error('Error deleting user:', deleteError);
      //       } else {
      //         console.log('User with id 2 deleted successfully.');
      //       }
      //     });
      //     connection.query('SELECT COUNT(distinct id) AS userCount FROM users', (countError, countResults) => {
      //       if (countError) {
      //         console.error('Error counting users:', countError);
      //       } else {
      //         console.log(countResults,"countresults")
      //         console.log('User count:', countResults[0].userCount);
      //       }
      //     })
      //     connection.query('SELECT COUNT(DISTINCT id) AS userCount, language FROM users where id >= 2 GROUP BY language', (countError, countResults) => {
      //       if (countError) {
      //         console.error('Error counting users:', countError);
      //       } else {
      //         console.log(countResults, "countresults");
      //         // countResultsは複数の行になる可能性があるため、ループを使用して各行の結果を表示することも検討してください
      //         countResults.forEach(result => {
      //           console.log(`Language: ${result.language}, User count: ${result.userCount}`);
      //         });
      //       }
      //     });
      //   }
      // });
    }
  });
});

// app.get('/deleteUser', (req, res) => {
  
// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
