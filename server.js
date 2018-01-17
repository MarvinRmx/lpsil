var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
var app = express();
var login = require('./controllers/login.js');
var register = require('./controllers/register.js');
var cookieParser = require('cookie-parser');

var product = require('./controllers/product.js');
var user = require('./controllers/user.js');
var editUser = require('./controllers/edit.js');
var disconnect = require('./controllers/disconnect.js');
var category = require('./controllers/category.js');
var admin = require('./controllers/admin.js');


app.use(cookieParser());
// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
app.set('trust proxy', 1); // trust first proxy

logger.info('server start');

app.get('/', function(req, res){
    res.redirect('/login');
});

app.listen(1313);

/* On affiche le formulaire d'enregistrement */

app.get('/', function(req, res){
    res.redirect('/login');
});

app.get('/login', login.checkIfConnected);

app.post('/login', login.connect);

app.get('/register', function (req, res) {
    res.render('register');
});
app.post('/register', register);

/* On affiche le profile  */
app.get('/profile', function (req, res) {
    res.render('profile',{user:req.cookies.user});
});


app.post('/admin/product/add', product.add);

app.get('/admin/product',product.editList);

app.get('/admin/user',user.editList);

app.get('/admin/user/edit/:id',user.displayEditInfo);

app.post('/admin/user/edit/:id',user.edit);

app.get('/admin/user/delete/:id',user.delete);

app.get('/admin/product/add', function (req, res) {
    admin.checkAdminRights(req,res);
    res.render('addProduct');
});

app.get('/admin/product/delete/:id',product.delete);

app.get('/admin/product/edit/:id',product.displayEditInfo);

app.post('/admin/product/edit/:id',product.edit);

app.get('/admin',function (req, res) {
    admin.checkAdminRights(req, res);
    res.render('admin');
});

app.get('/admin/category', category.list);

app.get('/admin/category/add',function(req, res){
    admin.checkAdminRights(req,res);
    res.render('addCategory');
});

app.post('/admin/category/add',category.add);

app.get('/admin/category/delete/:id',category.delete);


app.get('/user/edit',function(req,res){
    res.render('editUser', {user:req.cookies.user});
});
app.post('/user/edit',editUser.editUser);

app.get('/user/password',function(req,res){
    res.render('editPwd', {user:req.cookies.user});
});

app.post('/user/password',editUser.editPassword);

app.get('/user/disconnect',disconnect);

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
});

connection.connect();

connection.query('SELECT * from user', function (err, rows, fields) {
    if (!err)
        logger.info('Le résultat de la requête: ', rows);
    else
        logger.error(err);
});

connection.end();

var pool =  mysql.createPool({
    connectionLimit : 100, //important
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'ecommerce'
});

/*pool.getConnection(function(err,connection){
    if (err) {
        connection.release();
        res.json({"code" : 100, "status" : "Erreur de connexion à la DB"});
        return;
    }

    logger.info('connecté en tant que ' + connection.threadId);

    connection.query("select * from user",function(err,rows){
        connection.release();
        if(!err) {
            res.json(rows);
        }
    });

    connection.on('error', function(err) {
        res.json({"code" : 100, "status" : "Erreur de connexion à la DB"});
        return;
    });
});*/




