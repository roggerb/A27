var express = require('express');
var router = express.Router();

let bicicletaController = require('../controllers/bicicleta');

//rutas
router.get("/", bicicletaController.bicicleta_list);

router.get("/create", bicicletaController.bicicleta_create_get);

router.post("/create", bicicletaController.bicicleta_create_post);

router.post("/delete", bicicletaController.bicicleta_delete_post);

router.get("/:_id/update", bicicletaController.bicicleta_update_get);

router.post("/:_id/update", bicicletaController.bicicleta_update_post);

module.exports=router;
