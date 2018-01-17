var User = require('../models/user.js');
module.exports = function(req, res) {
    var user = User.create({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
    }).then(() => {
        res.redirect('/login');
    }).catch(function(error){
        console.error(error);
    });
}