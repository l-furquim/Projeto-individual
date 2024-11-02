var express = require("express");
var router = express.Router();

var votosController = require("../controllers/votosController");

router.post("/votar/fkMculado=:fkMaculado&fkContribuicao=:fkContribuicao", function (req, res) {
    votosController.criarNovoVoto(req, res);
});

router.get("/maculado=:fkMaculado", function (req, res) {
    votosController.buscarVotosPeloIdMaculado(req, res);
});

router.delete("/desvotar/idVoto=:idVoto&fkMculado=:fkMaculado&fkContribuicao=:fkContribuicao", function(req,res){
    votosController.desvotar(req,res);
});


module.exports = router;