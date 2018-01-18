var User = require('../models/user.js');

module.exports.checkIfConnected = function(req, res){
    if(typeof req.cookies.user !== 'undefined'){
        res.redirect('/profile');
    }
    else{
        res.render('login');
    }
}

module.exports.connect = function(req, res){
    var user = User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(function(result){
        if(result == null){
            res.redirect('/login');
        }
        res.cookie('user' ,
                   {id:result.dataValues.id_user,
                    username: result.dataValues.username,
                    firstname:result.dataValues.firstname,
                    lastname: result.dataValues.lastname},
                   {maxAge: 1000 * 60 * 30, httpOnly: false });
        if(result.dataValues.username == 'admin'){
            res.redirect('/admin');
        }
        else{
            res.redirect('/profile');
        }
    }).catch(function(error){
        console.error(error);
    });
}