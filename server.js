var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
var app = express();
var login = require('./controllers/login.js');
var register = require('./controllers/register.js');
var session = require('express-session');
var product = require('./controllers/product.js');
var cookieParser = require('cookie-parser');
var user = require('./controllers/user.js');
var editUser = require('./controllers/edit.js');
var disconnect = require('./controllers/disconnect.js');

var sess;

app.use(cookieParser());
// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'apzieapizrpoar',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

logger.info('server start');

app.get('/', function(req, res){
    res.redirect('/login');
});

app.listen(1313);

/* On affiche le formulaire d'enregistrement */

app.get('/', function(req, res){

    res.redirect('/login');
});

app.get('/login', function(req, res){
    console.log(req.body);
    res.render('login');
});

app.post('/login', login);

app.get('/register', function (req, res) {
    res.render('register');
});
app.post('/register', register);

/* On affiche le profile  */
app.get('/profile', function (req, res) {
    sess = req.session;
    var cookieUser = req.cookies.user;
    res.render('profile',{user:cookieUser});
    // On redirige vers la login si l'utilisateur n'a pas été authentifier
    // Afficher le button logout
});

app.get('/admin/product/add', function (req, res) {
    res.render('addProduct');
});
app.post('/admin/product/add', product.add);

app.get('/admin/product',product.editList);

app.get('/admin/user',user.editList);

app.get('/admin/user/edit/:id',user.displayEditInfo);

app.post('/admin/user/edit/:id',user.edit);

app.get('/admin/product/delete/:id',product.delete);

app.get('/admin/product/edit/:id',product.displayEditInfo);

app.post('/admin/product/edit/:id',product.edit);

app.get('/admin',function (req, res) {
    res.render('admin');
});

app.get('/user/edit',function(req,res){
    var cookieUser = req.cookies.user;
    res.render('editUser', {user:cookieUser});
});
app.post('/user/edit',editUser.editUser);

app.get('/user/password',function(req,res){
    var cookieUser = req.cookies.user;
    res.render('editPwd', {user:cookieUser});
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




