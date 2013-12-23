exports.home = function(req, res){
  res.render('home');
};
exports.insert = function(req, res){
  res.render('insert');
};
exports.delete = function(req, res){
  res.render('delete');
};
exports.update = function(req, res){
  res.render('updateISBN');
};
exports.select = function(req, res){
  res.render('list');
};