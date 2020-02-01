let express = require('express');
let router = express.Router();
let usuariosControllerAPI=require('../../controllers/api/usuariosControllerAPI');



router.get("/", usuariosControllerAPI.users_list);
router.post("/create", usuariosControllerAPI.users_create);
router.delete("/delete", usuariosControllerAPI.users_delete);
router.put("/:id/update", usuariosControllerAPI.users_update);
router.get("/reservar", usuariosControllerAPI.users_reservar);

module.exports = router;
