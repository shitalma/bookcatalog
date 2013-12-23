var http = require('http');
var sd = {};
sd.fs = require("fs");
var mysql = require('mysql'); 
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'shital',
  password : 'nirankari',
  database : 'test'
});
connection.connect();

sd.insertDetail = function(req,res,object){
  var result = {record:{}}; 
  connection.query('INSERT INTO bookcatalog(ISBN,Book_title,Price,Author,Publisher,No_of_pages) VALUES("'+object.ISBN+'","'+object.Book_title+'",'+object.Price+',"'+object.Author+'","'+object.Publisher+'",'+object.No_of_pages+')', function(err, rows, fields) {
  if (err) result.message = "Can't add this record. Please change the ISBN Number....";
      result.message = 'Record added Successfully';
  res.render('list',{message:result.message,list:[object]});
  connection.query("commit;",function(err){if(err)throw err;});
  });
};
sd.removeRecord = function(req,res,ISBN){
  var result = {record:{}}; 
  connection.query('DELETE from bookcatalog where ISBN="'+ISBN+'"', function(err, rows, fields) {
  if (err) result.message = "Record is not avaliable.....";
    result.message = 'Record deleted Successfully';
  res.render('list',{message:result.message,list:[{ISBN:ISBN}]});
  connection.query("commit;",function(err){if(err)throw err;});
  });
};
sd.displayRecord = function(req,res){
  connection.query('SELECT * from bookcatalog',function(err, rows, fields){
    if (err) throw err;
    res.render('list',{message:"Bookcatalog",list:rows});
  });
}
sd.update = function(req,res,ISBN){
  connection.query('SELECT * from bookcatalog where ISBN = "'+ISBN+'"',function(err, rows, fields){
    if (err) throw err;
    res.render('update',{message:"update details",list:rows[0]});
  });
}
sd.updateData = function(req,res,object){
  var result = {record:{}}; 
  connection.query('UPDATE bookcatalog SET Book_title="'+object.Book_title+'",Price = '+object.Price+',Author="'+object.Author+'",Publisher="'+object.Publisher+'",No_of_pages='+object.No_of_pages+'  where ISBN = "'+object.ISBN+'"', function(err, rows, fields){
  if (err)
    result.message = "Can't update";
  result.message = "Record updated successfully..."
  res.render('list',{message:result.message,list:[object]});
  connection.query("commit;",function(err){if(err)throw err;});
  });
};
exports.sd = sd;