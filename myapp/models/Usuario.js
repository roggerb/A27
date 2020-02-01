let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Reserva = require("./Reserva");

let bcrypt = require("bcrypt");
let uniqueValidator = require("mongoose-unique-validator");

let saltRounds = 10;
let Token = require("./Token");
let crypto = require("crypto");
let mailer = require("../mailer/mailer");


//funcion email
let validateEmail = function(email) {
  let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email);
};

let usuarioSchema = new Schema({
  nombre: {

    type: String,
    trim: true,
    required: [true, "El nombre es obligatorio"]
  },

  email: {

    type: String,
    trim: true,
    required: [true, "El email es obligatorio"],
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Por favor, introduzca un email válido"],
    match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/]
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"]
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {
    type: Boolean,
    default: false
  }
});

//Modelo de token
usuarioSchema.methods.enviar_email_bienvenida = function(cb) {
  let token = new Token({
    _userId: this.id,
    token: crypto.randomBytes(16).toString("hex")
  }); //El token es un String en hexadecimal

  let email_destination = this.email;
  token.save(function(err) {

    if (err) {
      return console.log(err.message);
    }

    let mailOptions = {
      from: "no-reply@redbicicletas.com",
      to: email_destination,
      subject: "Verificación de cuenta",
      text: "Hola,\n\n" +
        "Por favor, para verificar su cuenta haga click en este enlace: \n" +
        "http://192.168.228.3:3000" +
        "/token/confirmation/" +
        token.token +
        ".\n"
    };

    mailer.sendMail(mailOptions, function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(
        "Se ha enviado un email de bienvenida a " + email_destination + "."
      );
    });
  });
};



usuarioSchema.methods.resetPassword = function(cb) {

  let token = new Token({
    _userId: this.id,
    token: crypto.randomBytes(16).toString("hex")
  }); //El toke es un String en hexadecimal

  let email_destination = this.email;

  token.save(function(err) {

    if (err) {
      return cb(err);
    }



    let mailOptions = {

      from: "no-reply@redbicicletas.com",

      to: email_destination,

      subject: "Reseteo de password de cuenta",

      text: "Hola,\n\n" + "Por favor, para resetear el password de su cuenta haga click en este enlace: \n" + "http://192.168.56.101:3000" + "\/resetPassword\/" + token.token + ".\n"

    };



    mailer.sendMail(mailOptions, function(err) {

      if (err) {
        return cb(err);
      }



      console.log("Se ha enviado un email para resetear el password a: " + email_destination + ".");



    });

    cb(null);

  });

};



usuarioSchema.plugin(uniqueValidator, {
  message: "El email ya existe con otro usuario."
});

//contraseña
usuarioSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

//comprueba
usuarioSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

usuarioSchema.statics.reservar = function(id, biciId, desde, hasta, cb) {
  let reserva = new Reserva({
    usuario: id,
    bicicleta: biciId,
    desde: desde,
    hasta: hasta
  });

  console.log(reserva);

  reserva.save(cb);

};

//Muestra todos los usuarios
usuarioSchema.statics.allUsers = function(cb) {
  return this.find({}, cb);
};

//Agrega usuarios
usuarioSchema.statics.add = function(user, cb) {
  return this.create(user, cb);
};

//Busca un usuario
usuarioSchema.statics.findById = function(id, cb) {
  return this.findOne({
    _id: id
  }, cb);
};

//Elimina un usuario
usuarioSchema.statics.removeById = function(id, cb) {
  return this.deleteOne({
    _id: id
  }, cb);
};

//Actualiza un usuario
usuarioSchema.statics.updateById = function(id, user, cb) {
  return this.findByIdAndUpdate({
    _id: id
  }, user, cb);
};


module.exports = mongoose.model("Usuario", usuarioSchema);
