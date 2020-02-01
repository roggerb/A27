let Bicicleta = require('../models/Bicicleta');


//lista las bicicletas en html, con allbicis
exports.bicicleta_list = function (req, res) {
  Bicicleta.allBicis(function (err, bicis) {
    if(err) {res.status(500).send(err.message);}
    res.render("bicicletas/index", {bicis:bicis});
  });
};

//Muestra el formulario
exports.bicicleta_create_get = function (req, res) {
  res.render("bicicletas/create");
};

//Crea la bici del formulario
exports.bicicleta_create_post = function (req, res) {
  Bicicleta.add({
    bicicletaID: req.body.bicicletaID,
    color: req.body.color,
    modelo: req.body.modelo,
    ubicacion:[req.body.latitud, req.body.longitud]
  }, function (err, bicis) {
    if(err) {res.status(500).send(err.message);}
    res.redirect("/bicicletas");
  });
};

//Elimina una bici con el id
exports.bicicleta_delete_post = function (req, res) {
  Bicicleta.deleteOne({_id: req.body.id}, function (err, bicis) {
    if(err) {res.status(500).send(err.message);}
    res.redirect("/bicicletas");
  });
};

//Actializa renderiza una vista con los datos de la  bici
exports.bicicleta_update_get = function (req, res) {
  Bicicleta.findById(req.params._id,function (err, bici) {
    if(err) {res.status(500).send(err.message);}
    res.render("bicicletas/update", {bici:bici});
  });
};

//Actualiza la bici
exports.bicicleta_update_post = function(req, res){
  Bicicleta.updateById(req.params._id, {
    bicicletaID: req.body.bicicletaID,
    color: req.body.color,
    modelo: req.body.modelo,
    ubicacion:[req.body.latitud, req.body.longitud]
  }, function (err, bici) {
      if(err) {res.status(500).send(err.message);}
      res.redirect("/bicicletas");
  });
};
