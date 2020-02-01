let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reservaSchema = new Schema({
  desde: Date,
  hasta: Date,
  bicicleta: {type: mongoose.Schema.Types.ObjectId, ref:"Bicicleta"},
  usuario: {type: mongoose.Schema.Types.ObjectId, ref:"Usuario"}
});

//reservar
reservaSchema.methods.diasDeReserva  = function ()
{
  return moment(this.hasta.diff(moment(this.desde), "days")+1);
};

//Muestra todos los usuarios
reservaSchema.statics.allReservas = function (cb) {
  return this.find({}, cb);
};

//Agrega usuarios
reservaSchema.statics.add = function (reserva, cb) {
  return this.create(reserva, cb);
};

//Busca un usuario
reservaSchema.statics.findById = function (id, cb) {
  return this.findOne({_id:id}, cb);
};

//Elimina un usuario
reservaSchema.statics.removeById = function (id, cb) {
  return this.deleteOne({_id:id}, cb);
};

//Actualiza un usuario
reservaSchema.statics.updateById = function (id, reserva, cb) {
  return this.findByIdAndUpdate({_id:id}, reserva, cb);
};


module.exports = mongoose.model("Reserva", reservaSchema);
