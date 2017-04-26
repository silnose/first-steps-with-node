var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var session = require("express-session");
//database
var cassandra = require("cassandra-driver");
var connection;
var db_config = {
contactPoints : ['127.0.0.1'],
keyspace:'userdetails'
};
connection = new cassandra.Client(db_config);
connection.connect(function(err,result){
console.log('cassandra connected');
});


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    res.send('index.html');	
});




/*Get API*/

router.get('/api',function(req,res){
res.send('request recibido');
});

router.get('/pepe1',function(req,res){
res.send('soy una nueva ruta');
});


router.post('/login', function (request, response) {
var body = request.body;
var usersessId = body.username;
var hash = crypto.createHash('md5').update(body.pwd).digest('hex');
var postVars = {username: usersessId, password: hash};
// fetching from CASSANDRA
var queryString = 'SELECT password FROM users where username = ?';
connection.execute(queryString,[usersessId], function(err, rows) {
console.log(body.hash)
console.log('rows',rows);
if(err){ 
handleDisconnect();
throw err;
} 
if(rows['rows'].length == 0){
 
//response.render('unauthorized', { title: 'unauthorized', username: usersessId +'U r unauthorized man ..!!'});
response.send('unauthorized -1 ');
}
else{
var passwordSuccess = 0;
for (var i in rows['rows']) {
if(rows['rows'][i]['password'] == body.pwd){
console.log('USER SUCCESS');
passwordSuccess = 1;
break;
}
else{
passwordSuccess = 0;
}
}
if(passwordSuccess == 1){
request.session.sessId = usersessId;
//response.render('home', { appTitle: 'HOME', username: body.Username +'home page .. welcome !!'});
response.send('authorized');
}
else{
//response.render('unauthorized', {title: 'unauthorized', username: body.Username +'wrong password'});
response.send('unauthorized 2');
}
}
});
});


router.post('/register', function (request, response) {
var body = request.body;
var usersessId = body.regUsername;
var hash = crypto.createHash('md5').update(body.regPassword).digest('hex');
var query = 'INSERT INTO users ( username, email, password) VALUES (?, ?, ?)';
var params = [body.regUsername, body.regEmail, hash];
connection.execute(query, params, { prepare: true }, function (err) {
if(err) {  
throw err;
} 
});
console.log('user registered');
request.session.sessId = usersessId;
response.send('authorized 2');
});

module.exports = router;
