let express = require('express');
let router = express.Router();
let bicicletaControllerAPI=require('../../controllers/api/bicicletaControllerAPI');



router.get("/", bicicletaControllerAPI.bicicleta_list);
router.post("/create", bicicletaControllerAPI.bicicleta_create);
router.delete("/delete", bicicletaControllerAPI.bicicleta_delete);
router.put("/:id/update", bicicletaControllerAPI.bicicleta_update);

module.exports = router;
