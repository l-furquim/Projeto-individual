var express = require("express");
var router = express.Router();

var contribuicaoController = require("../controllers/contribuicaoController");

router.post("/cadastrar", function (req, res) {
    contribuicaoController.cadastrar(req, res);
});

router.get("/buscar/:id", function (req, res) {
  contribuicaoController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  contribuicaoController.listar(req, res);
});

router.get("/listar/tag/:tipo", function (req, res){
  contribuicaoController.listarPorTipo(req,res);
});

router.post("/comentar", function(req, res){
  contribuicaoController.comentar(req,res);
})

module.exports = router;