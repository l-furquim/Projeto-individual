var express = require("express");
var router = express.Router();

var votosController = require("../controllers/votosController");

router.get("/votos/novo/:fkMaculado", function (req, res) {
    votosController.criarNovoVoto(req, res);
});

router.get("/votos/maculado=:fkMaculado&contribuicao=:fkContribuicao", function (req, res) {
    votosController.buscarVotosPeloIdMaculado(req, res);
})

module.exports = router;