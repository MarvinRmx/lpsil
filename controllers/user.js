var User = require('../models/user.js');

module.exports.editList = function(req,res){
    var users = User.findAndCountAll()
        .then(result => {
        res.render('editListUser',{users: result.rows, nbUsers: result.count});
}).catch(function(error){
        console.error(error);
    });
}

module.exports.displayEditInfo = function(req, res){
    var user = User.findOne({
        where:
            {
                id_user: req.params.id
            }
    }).then(function(result) {
        res.render('editUserAdmin',{user: result});
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.edit = function(req, res){
    var user = User.findOne({
        where:
            {
                id_user: req.params.id
            }
    }).then(function(result){
        result.update(
            {
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            }
        ).then(()=>{
            res.redirect('/admin/user');
    }).catch(function(error){
            console.error(error);
        });
    }).catch(function(error){
        console.error(error);
    });
}