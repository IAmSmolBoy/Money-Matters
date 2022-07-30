var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var router = express.Router();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist/Money-Matters')));

router.get('*', function(req, res, next) {
  res.sendFile('index.html', { root: "dist/Money-Matters/" });
});

app.use('/', router);

module.exports = app;
// var MongoClient = require('mongodb').MongoClient

// const url = "mongodb://localhost:27017/"

// MongoClient.connect(url, (err, client) => {
//   const db = client.db(dbName);
//   db.collection(table).find().toArray((err, artifact) => {
//         if (err) throw err
//         artifact.forEach((value) => {
//         console.log(value.scriptname)
//     })
//     client.close()
//   })
// })

// const port = process.env.PORT || '8080';
// app.listen(port, () => console.log(`API running on http://localhost:${port}`));

// module.exports = app;