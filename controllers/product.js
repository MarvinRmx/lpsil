var Product = require('../models/product.js');
var Category = require('../models/category.js');
var admin = require('./admin.js');

//Partie publique

module.exports.list = function(req, res){
    var products = Product.findAndCountAll()
        .then(result => {
        res.render('listProduct',{products: result.rows, nbProducts: result.count});
}).catch(function(error){
        console.error(error);
    });
}

module.exports.displayFromCategory = function(req, res){
    var category = Category.findOne({
        where: {
            name: req.params.category_name
        }
    }).then(cat=> {
        var products = Product.findAndCountAll({
            where: {
                categoryIdCat: cat.id_cat,
            }
        }).then(result => {
            res.render('productsFromCategory',{products: result.rows,nbProducts: result.count, categorie: cat});
        }).catch(function(error){
        console.error(error);
        });
    }).catch(function(error){
        console.error(error);
    });
}
//Partie admin

module.exports.add = function(req, res) {
    admin.checkAdminRights(req,res);
    var product = Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        categoryIdCat: req.body.category
    }).then(() => {
        res.redirect('/admin/product');
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.displayAddForm = function(req, res){
    admin.checkAdminRights(req,res);
    var categories = Category.findAll().then(result => {
        res.render('addProduct',{categories: result});
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.editList = function(req, res){
    admin.checkAdminRights(req,res);
    var products = Product.findAndCountAll()
        .then(result => {
        res.render('editListProduct',{products: result.rows, nbProducts: result.count});
        }).catch(function(error){
        console.error(error);
    });
}


module.exports.delete = function(req, res){
    admin.checkAdminRights(req,res);
    var product = Product.findOne({
        where:
        {
            id_prod: req.params.id
        }
    }).then(function(result){
        result.destroy().then(()=>{
            res.redirect('/admin/product');
        }).catch(function(error){
            console.error(error);
        });
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.displayEditInfo = function(req, res){
    admin.checkAdminRights(req,res);
    var product = Product.findOne({
        where:
            {
                id_prod: req.params.id
            }
    }).then(function(result) {
        var categories = Category.findAll().then(cat => {
            res.render('editProduct',{product: result, categories: cat});
            }).catch(function(error){
            console.error(error);
        });
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.edit = function(req, res){
    admin.checkAdminRights(req,res);
    var product = Product.findOne({
        where:
            {
                id_prod: req.params.id
            }
    }).then(function(result){
        result.update(
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                categoryIdCat: req.body.category
            }
        ).then(()=>{
            res.redirect('/admin/product');
    }).catch(function(error){
            console.error(error);
        });
    }).catch(function(error){
        console.error(error);
    });
}