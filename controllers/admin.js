module.exports.checkAdminRights = function(req, res){
    if(req.cookies.user.username != "admin"){
        res.redirect('/profile');
    }
}