var User = require('../models/user.js');

module.exports = function(req, res){
    var user = User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(function(result){
        if(result == null){
            res.redirect('/login');
        }
        req.session.firstname = result.dataValues.firstname;
        req.session.lastname = result.dataValues.lastname;
        res.cookie('user' , req.session.lastname,{ maxAge: 1000 * 60 * 10, httpOnly: false });
        res.redirect('/profile');
    }).catch(function(error){
        console.error(error);
    });
}