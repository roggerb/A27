let express = require("express");
let router = express.Router();
let usuarioController = require("../controllers/usuario");

// Lista
router.get("/", usuarioController.list);
// Crea usuarios
router.get("/create", usuarioController.create_get);
router.post("/create", usuarioController.create);
// Borra usuarios
router.post("/delete", usuarioController.delete);
// Actualiza usuarios
router.get("/:_id/update", usuarioController.update_get);
router.post("/:_id/update", usuarioController.update);

module.exports = router;
