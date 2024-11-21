var express = require("express");
var router = express.Router();

var maculadoController = require("../controllers/maculadoController");

router.post("/cadastrar", function (req, res) {
    maculadoController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    maculadoController.autenticar(req, res);
});

router.get("/buscarDados/:idMaculado", function(req,res){
    maculadoController.buscarDados(req,res);
});

router.get("/ranking/buscar", (req, res) => {
    maculadoController.buscarRanking(req,res);
});

module.exports = router;