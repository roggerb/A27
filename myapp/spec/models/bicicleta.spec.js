
/*let mongoose = require("mongoose");

let Bicicleta = require("../../models/Bicicleta.js");

describe("Testing unitario Bicicletas", function(){
    beforeEach(function (done) {
        var mongoDB = "mongodb://localhost/testdb";
        mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true  });
        var db = mongoose.connection;
        db.on("error", console.error.bind('Error de conexión con MongoDB'));
        db.once("open", function () {
            console.log("Conectado a la BBDD testdb");
            done();
        });
    });



    afterEach(function (done) {
        Bicicleta.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            done();
        });
    });

  describe("Bicicleta.allBicis", () => {
          it("Empieza vacío", (done)=> {
              Bicicleta.allBicis(function (err, bicis) {
                  expect(bicis.length).toBe(0);
                  done();
              });
          });
  });





  describe("Bicicleta.add", () => {
        it("añade una bici", (done)=> {
            let aBici = new Bicicleta({bicicletaID: 1, color: "verde", modelo: "urbana"});
            Bicicleta.add (aBici, (err,newBici)=>{
                if (err) console.log(err);
                Bicicleta.allBicis((err,bicis)=>{
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].bicicletaID).toEqual(aBici.bicicletaID);
                    done();
                });
            });
        });
    });

   describe('Bicicleta.findById', function() {
     it('encuentra una bici con su id', function(done) {
       let aBici = new Bicicleta({bicicletaID: 1, color: "verde", modelo: "urbana"});
       Bicicleta.add (aBici, (err,newBici)=>{
           if (err) console.log(err);
           Bicicleta.allBicis((err,bicis)=>{
               expect(bicis.length).toEqual(1);
               expect(bicis[0].bicicletaID).toEqual(aBici.bicicletaID);
               done();
           });
       });
       Bicicleta.findById(1, function (err, bici) {
         if(err) {res.status(500).send(err.message);}

       });
   });


  });




/*
beforeEach (() => {Bicicleta.allBicis=[]});

describe('Bicicleta.allBicis', function() {

  it('Empieza sin elementos', function() {

    expect(Bicicleta.allBicis.length).toBe(0);

  });

});


describe('Bicicleta.add', function() {
  it('añadir un elemento', function() {
    expect(Bicicleta.allBicis.length).toBe(0);

    let a = new Bicicleta(1, "Rojo", "Trek", [28.503789, -13.853296]);

    Bicicleta.add(a);

    expect(Bicicleta.allBicis.length).toBe(1);
    expect(Bicicleta.allBicis[0]).toBe(a);
  });
});

describe('Bicicleta.findById', function() {
  it('devuelve una bicicleta con el id 1', function() {
    expect(Bicicleta.allBicis.length).toBe(0);

    let a = new Bicicleta(1, "Azul", "Trek", [28.503789, -13.853296]);

    Bicicleta.add(a);

    let targetBici = Bicicleta.findById(1);

    expect(targetBici.id).toBe(1);

    expect(targetBici.color).toBe(a.color);

    expect(targetBici.modelo).toBe(a.modelo);

  });
});

describe('Bicicleta.removeById', function() {
  it('elimina una bicicleta del array', function() {
    expect(Bicicleta.allBicis.length).toBe(0);

    let a = new Bicicleta(1, "Azul", "Trek", [28.503789, -13.853296]);
    Bicicleta.add(a);

    let paraBorrar = Bicicleta.removeById(1);
    expect(Bicicleta.allBicis.length).toBe(0);

  });
});
*/
