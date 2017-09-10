var express = require('express');
var morgan = require('morgan');
var path = require('path');
var counter=0;
var app = express();
var crypto = require('crypto');
var Pool = require('pg').Pool;
//var bodyParser = require('body-parser');

/*var config = {
  user: 'masterkaushikrao',
  database: 'masterkaushikrao',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
};*/

var app=express();
app.use(morgan('combined'));
//app.use(bodyParser.JSON);

var articles = {
    'article-one': {
       title:'Artical One',
       heading:'Article One',
       date:'05/05/2017',
       content:`
            <h3 > Welcome to Artical one</h3>
            <p1>This is my web application</p1>
    `},
    'article-two': {
       title:'Artical Two',
       heading:'Article Two',
       date:'06/05/2017',
       content:`
            <h3 > Welcome to Artical Two</h3>
            <p1>hello</p1>
    `},
    'article-three': {
       title:'Artical Three',
       heading:'Article Three',
       date:'05/05/2017',
       content:`
            <h3 > Welcome to Artical Three</h3>
            <p1>How are you</p1>
    `}
};
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

/* 
function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input , salt, 100000, 512, 'sha512');
    return ['pbkdf2' , '100000', salt, hashed.toString('hex')].join('$');
}

 app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/cresate-user', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.getRandomBytes(128).toString('hex');
    var dbString =hash(password,salt); 
    pool.querry('INSERT INTO "user"(username,password) VALUES($1,$2)',[username,dbString], function(err,result){
        if(err){
        res.status(500).send(err.toString());
          
      } else{
          res.send('User successfully created '+ username);
          
      }
  });
});
*/

var pool = new Pool(config);
app.get('/test-db', function (req, res){
    pool.query('SELECT * FROM test', function(err,result){
      if(err){
        res.status(500).send(err.toString());
          
      } else{
          res.send(JSON.stringify(result.rows));
      }
});
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

/*
app.get('/articles/:articleName',function(req,res){
   pool.query("SELECT * FROM article WHERE title = '"+ req.params.articleName +"'",function(err,result){
      if(err){
        res.status(500).send(err.toString());
          
      } else {
          if(res.rows.length === 0){
          res.status(404).send('Article not found');
        }
        else{
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
      }
    }); 
});
*/

app.get('/:articleName',function(req,res){
    var articleName = request.params.articalName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/counter',function(req,res){
  counter = counter + 1;
  res.send(counter.toString());
});

function createTemplate (data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `
    <html>
        <head>
            <title>${title}</tile>
            <meta name="viewport" content="width-device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div>
                <div><a href="/">Home</a></div>
                <hr/>
                <h3 class="title">${heading}</h3>
                <div class="para">${date.toDateString()}</div>
                <hr/>
                <div class="content">${content}</div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80
var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
