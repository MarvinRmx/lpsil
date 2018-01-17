var Category = require('../models/category.js');
var admin = require('./admin.js');

module.exports.add = function(req, res){
    var category = Category.create({
        name: req.body.name,
    }).then(() => {
        res.redirect('/admin/category');
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.list = function(req, res){
    admin.checkAdminRights(req,res);
    var categories = Category.findAndCountAll()
        .then(result => {
        res.render('editListCategory',{categories: result.rows, nbCategories: result.count});
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.delete = function(req, res){
    admin.checkAdminRights(req,res);
    var category = Category.findOne({
        where:
            {
                id_cat: req.params.id
            }
    }).then(function(result){
        result.destroy().then(()=>{
            res.redirect('/admin/category');
    }).catch(function(error){
            console.error(error);
        });
    }).catch(function(error){
        console.error(error);
    });
}