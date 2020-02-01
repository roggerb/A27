let Usuario = require("../../models/Usuario");

exports.users_list = function(req, res) {

    Usuario.allUsers(function (err, users) {
      if(err) {res.status(500).send(err.message);}
      res.status(200).send(users);
    });
};




exports.users_create = function (req, res) {
  Usuario.add({
    nombre: req.body.nombre
  }, function (err, users) {
    if(err) {res.status(500).send(err.message);}
    res.status(201).send();
  });

};

exports.users_delete = function (req, res) {
  Usuario.deleteOne({_id: req.body._id}, function (err, users) {
    if(err) {res.status(500).send(err.message);}
    res.status(204).send();
  });
};

exports.users_update = function (req, res) {
  Usuario.updateById(req.params.id, {
    nombre: req.body.nombre
  }, function (err, users) {
      if(err) {res.status(500).send(err.message);}
      res.status(204).send();
  });
};


exports.users_reservar =function (req, res)
{
  Usuario.findById(req.body._id, function (err, users) {
    if(err) {res.status(500).send(err.message);}
    console.log(users);

    Usuario.reservar(req.body._id ,req.body.bici_id, req.body.desde, req.body.hasta, function(err){
      console.log("Reservada!!");
      res.status(200).send();
    });

});
};
