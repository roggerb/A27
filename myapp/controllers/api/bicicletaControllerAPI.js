let Bicicleta = require("../../models/Bicicleta");

//devuelve una lista de todas las bicicletas

exports.bicicleta_list = function(req, res) {

    Bicicleta.allBicis(function (err, bicis) {
      if(err) {res.status(500).send(err.message);}
      res.status(200).send(bicis);
    });
};




exports.bicicleta_create = function (req, res) {
  Bicicleta.add({
    bicicletaID: req.body.bicicletaID,
    color: req.body.color,
    modelo: req.body.modelo,
    ubicacion:[req.body.latitud, req.body.longitud]
  }, function (err, bicis) {
    if(err) {res.status(500).send(err.message);}
    res.status(201).send();
  });

};

exports.bicicleta_delete = function (req, res) {
  Bicicleta.deleteOne({_id: req.body.id}, function (err, bicis) {
    if(err) {res.status(500).send(err.message);}
    res.status(204).send();
  });
};

exports.bicicleta_update = function (req, res) {
  Bicicleta.updateById(req.params.id, {
    bicicletaID: req.body.bicicletaID,
    color: req.body.color,
    modelo: req.body.modelo,
    ubicacion:[req.body.latitud, req.body.longitud]
  }, function (err, bici) {
      if(err) {res.status(500).send(err.message);}
      res.status(204).send();
  });
};
