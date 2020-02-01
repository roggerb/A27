/*let Bicicleta = require('../../models/Bicicleta');
var request = require('request');
let server = require('../../bin/www');

beforeEach (() => {Bicicleta.allBicis=[]});

describe('Test para la api', function() {
  describe('Get/', function() {

    it('codigo 200', function() {

      expect(Bicicleta.allBicis.length).toBe(0);

      let a = new Bicicleta(1, "Azul", "Rural", [28,-13]);

      Bicicleta.add(a);

      request.get("http://localhost:3000/api/bicicletas", (error, response, body) => {
        expect(response.statusCode).toBe(200);
      });

    });

  });
});


describe('Post/', function() {
  it('Codigo 201', function(done) {
    let bici= '{"id":10, "color": "Azul", "modelo":"Urbano", "latitud": 28, "longitud" : -13 }';

    let header = {"Content-type": "application/JSON"};

    request.post({
      headers : header,

      url : "http://localhost:3000/api/bicicletas/create",

      body : bici
    }, (error, response, body)=>{
      expect(response.statusCode).toBe(201);
      expect(Bicicleta.findById(10).color).toBe("Azul");

      done();
    });
  });
});


describe('Put/', function() {
  it('Codigo 200', function(done) {
    let bici= '{"id":11, "color": "Negro", "modelo":"Urbano", "latitud": 28, "longitud" : -13 }';

    let header = {"Content-type": "application/JSON"};

    let a = new Bicicleta(10, "Azul", "Rural", [28,-13]);

    Bicicleta.add(a);


    request.put({
      headers : header,
      url : "http://localhost:3000/api/bicicletas/10/update",
      body : bici
    }, (error, response, body)=>{
      expect(response.statusCode).toBe(200);
      expect(Bicicleta.findById(11).color).toBe("Negro");

      done();
    });

  });
});

describe('delete', function() {
  it('Codigo 204', function(done) {
    let header = {"Content-type": "application/JSON"};
    let a = new Bicicleta(10, "Azul", "Rural", [28,-13]);

    Bicicleta.add(a);

    request.delete({
      headers: header,
      url : "http://localhost:3000/api/bicicletas/delete",
      body : '{"id" : 10}'
    }, (error, response, body)=>{
      expect(response.statusCode).toBe(204);
      expect(Bicicleta.allBicis.length).toBe(0);

      done();
    });
  });
});
*/
