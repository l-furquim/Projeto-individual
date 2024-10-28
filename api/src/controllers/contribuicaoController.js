var contribuicaoModel = require("../models/contribuicaoModel");

/* function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  contribuicaoModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
} */

function listar(req, res) {
  contribuicaoModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  contribuicaoModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  const conteudo = req.body.conteudo;
  const tipo = req.body.tipo;
  const fkMaculado = req.body.fkMaculado;

  /* contribuicaoModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      contribuicaoModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  }); */

  if(conteudo.length > 0){
    contribuicaoModel.cadastrar(conteudo, tipo, fkMaculado).then((resultado)=> {
      res.status(201).json(resultado);
    });
  }else{
    re.status(401).json({mensagem: "Por favor insira um conteudo valido"});
  }

}

function listarPorTipo(req, res){
  const tipo = req.params.tipo;

  if(tipo.length > 0){
    contribuicaoModel.buscarPorTipo(tipo).then((resposta) => {
      res.status(201).json(resposta);
    });
  }else{
    res.status(401).json({
      mensagem: "Por favor insira um tipo valido"
    });
  };

}
module.exports = {
  buscarPorId,
  cadastrar,
  listar,
  listarPorTipo
};
