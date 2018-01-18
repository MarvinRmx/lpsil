var User = require('../models/user.js');

module.exports.editUser = function(req, res){
    var user = User.findOne({
        where:
            {
                id_user: req.cookies.user.id
            }
    }).then(function(result){
        result.update(
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname
            }
        ).then(()=>{
            res.cookie('user',
                       {id:result.dataValues.id_user,
                        username: result.dataValues.username,
                        firstname:result.dataValues.firstname,
                        lastname: result.dataValues.lastname},
                       {maxAge: 1000 * 60 * 10, httpOnly: false, overwrite: true });
            res.redirect('/profile');
    }).catch(function(error){
            console.error(error);
        });
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.editPassword = function(req,res){
    var user = User.findOne({
        where:
            {
                id_user: req.cookies.user.id
            }
    }).then(function(result){
        if(req.body.old_password == result.dataValues.password) {
            result.update(
                {
                    password: req.body.new_password
                }
            ).then(()=> {
                res.redirect('/profile');
            }).catch(function (error) {
                console.error(error);
            });
        } else {
            var bool = "test";
            res.render('editPassword',{bool:bool});
        }
        }).catch(function(error){
                console.error(error);
        });
}