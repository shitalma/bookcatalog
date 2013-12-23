var handler = {};
var fs = require('fs');
var sd = require('./library.js').sd;
handler.insertRecord = function(req,res){
    sd.insertDetail(req,res,req.body);
};
handler.deleteRecord = function(req,res){
    sd.removeRecord(req,res,req.body.ISBN);
};
handler.selectRecord = function(req,res){
    sd.displayRecord(req,res);
};
handler.updateRecord = function(req,res){
    sd.update(req,res,req.body.ISBN);
};
handler.updateData = function(req,res){
    sd.updateData(req,res,req.body);
};
exports.handler = handler;