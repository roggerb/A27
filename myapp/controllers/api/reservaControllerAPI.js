let Reserva = require("../../models/Reserva");


exports.reserva_list = function(req, res) {

    Reserva.allReservas(function (err, reservas) {
      if(err) {res.status(500).send(err.message);}
      res.status(200).send(reservas);
    });
};




exports.reserva_create = function (req, res) {
  Reserva.add({
    desde: req.body.desde,
    hasta: req.body.hasta,
    bicicleta: req.body.biciId,
    usuario: req.body.userId
  }, function (err, reservas) {
    if(err) {res.status(500).send(err.message);}
    res.status(201).send();
  });

};

exports.reserva_delete = function (req, res) {
  Reserva.deleteOne({_id: req.body._id}, function (err, reservas) {
    if(err) {res.status(500).send(err.message);}
    res.status(204).send();
  });
};

exports.reserva_update = function (req, res) {
  Reserva.updateById(req.params.id, {
    desde: req.body.desde,
    hasta: req.body.hasta,
    bicicleta: req.body.biciId,
    usuario: req.body.userId
  }, function (err, reservas) {
      if(err) {res.status(500).send(err.message);}
      res.status(204).send();
  });
};

/*
exports.reserva_dias =function (req, res)
{
  Reserva.diasDeReserva()

};*/
