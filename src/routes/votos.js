var express = require("express");
var router = express.Router();

var votosController = require("../controllers/votosController");

router.post("/novo/fkMculado=:fkMaculado&fkContribuicao=:fkContribuicao", function (req, res) {
    votosController.criarNovoVoto(req, res);
});

router.get("/maculado=:fkMaculado&contribuicao=:fkContribuicao", function (req, res) {
    votosController.buscarVotosPeloIdMaculado(req, res);
})

module.exports = router;