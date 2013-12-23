var express = require('express');
var routes = require('./routes');
var index = require('./routes/index');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var handler = require('./handler').handler;


var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/',routes.home);
app.get('/home',routes.home);
app.get('/insert',routes.insert);

app.get('/delete',routes.delete);
app.get('/update',routes.update);
app.get('/select',handler.selectRecord);

app.post('/insert',handler.insertRecord);
app.post('/delete',handler.deleteRecord);
app.post('/update',handler.updateRecord);
app.post('/updateData',handler.updateData);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
