var Product = require('../models/product.js');

module.exports.add = function(req, res) {
    var product = Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
    }).then(() => {
        res.redirect('/product');
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.list = function(req, res){
    var products = Product.findAndCountAll()
        .then(result => {
        res.render('listProduct',{products: result.rows, nbProducts: result.count});
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.editList = function(req, res){
    var products = Product.findAndCountAll()
        .then(result => {
        res.render('editListProduct',{products: result.rows, nbProducts: result.count});
        }).catch(function(error){
        console.error(error);
    });
}


module.exports.delete = function(req, res){
    var product = Product.findOne({
        where:
        {
            id_prod: req.params.id
        }
    }).then(function(result){
        result.destroy().then(()=>{
            res.redirect('/product');
        }).catch(function(error){
            console.error(error);
        });
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.displayEditInfo = function(req, res){
    var product = Product.findOne({
        where:
            {
                id_prod: req.params.id
            }
    }).then(function(result) {
        res.render('editProduit',{product: result});
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.edit = function(req, res){
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
                stock: req.body.stock
            }
        ).then(()=>{
            res.redirect('/product');
    }).catch(function(error){
            console.error(error);
        });
    }).catch(function(error){
        console.error(error);
    });
}