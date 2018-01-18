module.exports.checkAdminRights = function(req, res){
    if(typeof req.cookies.user == 'undefined') {
        res.redirect('/login');
    }
    else{
        if(req.cookies.user.username != "admin"){
            res.redirect('/profile');
        }
    }
}