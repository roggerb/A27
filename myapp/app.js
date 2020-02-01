//Imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var bcrypt = require("bcrypt");
var uniqueValidator = require("mongoose-unique-validator");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var Usuario = require("./models/Usuario");
var Token = require("./models/Token");

const passport = require("./config/passport");
const session = require("express-session");

const store = new session.MemoryStore();


var loginRoutes = require("./routes/login");
//bicicletas
var bicicletasRouter = require('./routes/bicicletas');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
var usuariosAPIRouter = require('./routes/api/usuarios');
var reservasAPIRouter = require('./routes/api/reservas');

//usuarios
var usuariosRouter = require("./routes/usuarios");
var tokenRouter = require("./routes/tokens");

var app = express();

//Mongo
mongoose.connect('mongodb://localhost/red_bicicletas', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;

//errores
db.on("error", console.error.bind("Error de conexion con MongoDB"));

// view engine setup
app.use(session({

  cookie: {
    magAge: 240 * 60 * 60 * 1000
  }, //Tiempo en milisegundos

  store: store,
  saveUninitialized: true,
  resave: "true",
  secret: "cualquier cosa no pasa nada 477447"
}));


//Middleware
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.get("/login", function(req, res) {
  res.render("session/login");
});


app.post("/login", function(req, res, next) {

  passport.authenticate("local", function(err, usuario, info) {

    if (err) return next(err);

    if (!usuario) return res.render("session/login", {
      info
    });

    req.logIn(usuario, function(err) {

      if (err) return next(err);

      return res.redirect("/");

    });

  })(req, res, next);

});



app.get("/logout", function(req, res) {

  req.logOut(); //Limpiamos la sesión

  res.redirect("/");

});


app.get("/forgotPassword", function(req, res) {

  res.render("session/forgotPassword");

});



app.post("/forgotPassword", function(req, res) {

  Usuario.findOne({
    email: req.body.email
  }, function(err, usuario) {

    if (!usuario) return res.render("session/forgotPassword", {
      info: {
        message: "No existe ese email en nuestra BBDD."
      }
    });



    usuario.resetPassword(function(err) {

      if (err) return next(err);

      console.log("session/forgotPasswordMessage");

    });

    res.render("session/forgotPasswordMessage");

  });

});



app.get("/resetPassword/:token", function(req, res, next) {

  Token.findOne({
    token: req.params.token
  }, function(err, token) {

    if (!token) return res.status(400).send({
      type: "not-verified",
      msg: "No existe un usuario asociado al token. Verifique que su token no haya expirado."
    });



    Usuario.findById(token._userId, function(err, usuario) {

      if (!usuario) return res.status(400).send({
        msg: "No existe un usuario asociado al token."
      });

      res.render("session/resetPassword", {
        errors: {},
        usuario: usuario
      });

    });

  });

});



app.post("/resetPassword", function(req, res) {

  if (req.body.password != req.body.confirm_password) {

    res.render("session/resetPassword", {
      errors: {
        confirm_password: {
          message: "No coincide con el password introducido."
        }
      },

      usuario: new Usuario({
        email: req.body.email
      })
    });

    return;

  }

  Usuario.findOne({
    email: req.body.email
  }, function(err, usuario) {

    usuario.password = req.body.password,

      usuario.save(function(err) {

        if (err) {

          res.render("session/resetPassword", {
            errors: err.errors,
            usuario: new Usuario({
              email: req.body.email
            })
          });

        } else {

          res.redirect("/login");

        }

      });

  });

});



//Instantiations
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));



//Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
//logIn
app.use("/login", loginRoutes);

//bicicletas

app.use('/bicicletas', loggedIn, bicicletasRouter);

// api / v1 / bicicletas
app.use('/api/bicicletas', bicicletasAPIRouter);

// api / v1 / usuarios
app.use('/api/usuarios', usuariosAPIRouter);

app.use('/api/reservas', reservasAPIRouter);

//usuarios
app.use("/token", tokenRouter);
app.use("/usuarios", usuariosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log("Usuario no logueado");
    res.redirect("/");
  }
}
//Server bootup or server export
module.exports = app;
