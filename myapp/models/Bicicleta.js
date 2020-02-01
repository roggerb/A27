let mongoose = require('mongoose');

let Schema = mongoose.Schema;


//Esquema de base de datos
let bicicletaSchema = new Schema({
  bicicletaID: Number,
  color: String,
  modelo: String,
  ubicacion:{type: [Number], index: true}
});

//Lista las bicicletas
bicicletaSchema.statics.allBicis = function (cb) {
  return this.find({}, cb);
};

//Agrega bicicletas
bicicletaSchema.statics.add = function (aBici, cb) {
  return this.create(aBici, cb);
}

//Busca una  bicicleta
bicicletaSchema.statics.findById = function (id, cb) {
  return this.findOne({_id:id}, cb);
}

//Elimina una bicicleta
bicicletaSchema.statics.removeById = function (id, cb) {
  return this.deleteOne({_id:id}, cb);
};

bicicletaSchema.statics.updateById = function (id, bici, cb) {
  return this.findByIdAndUpdate({_id:id}, bici, cb);
};


module.exports = mongoose.model("Bicicleta", bicicletaSchema);
