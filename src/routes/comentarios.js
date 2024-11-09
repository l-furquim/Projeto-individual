var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController");

router.post("/comentar", function (req, res) {
  comentarioController.comentar(req, res);
});

router.get("/listar", function (req, res) {
  comentarioController.listar(req, res);
});

router.put(`/fechar/comentario=:idComentario`, function (req, res){
  comentarioController.fechar(req,res);
});

module.exports = router;