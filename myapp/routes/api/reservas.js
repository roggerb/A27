let express = require('express');
let router = express.Router();
let reservaControllerAPI=require('../../controllers/api/reservaControllerAPI');



router.get("/", reservaControllerAPI.reserva_list);
router.post("/create", reservaControllerAPI.reserva_create);
router.delete("/delete", reservaControllerAPI.reserva_delete);
router.put("/:id/update", reservaControllerAPI.reserva_update);
//router.get("/reservar", usuariosControllerAPI.users_reservar);

module.exports = router;
