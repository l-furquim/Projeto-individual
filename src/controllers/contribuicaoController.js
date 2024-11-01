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
  const titulo = req.body.titulo;
  const conteudo = req.body.conteudo;
  const tipo = req.body.tipo;
  const fkMaculado = req.body.fkMaculado;
  const tag = req.body.tag;
  const conteudoTag = req.body.conteudoTag;
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
    contribuicaoModel.cadastrar(titulo,conteudo, tipo, fkMaculado, tag, conteudoTag).then((resultado)=> {
      res.status(201).json(resultado);
    });
  }else{
    res.status(401).json({mensagem: "Por favor insira um conteudo valido"});
  }

}

function listarPorTipo(req, res) {
  const tipo = req.params.tipo;

  if (!tipo || tipo.length === 0) {
      return res.status(400).json({ mensagem: "Por favor insira um tipo válido" });
  }

  contribuicaoModel.buscarPorTipo(tipo)
      .then((resposta) => {
          if (resposta.length === 0) {
              return res.status(404).json({ mensagem: "Nenhuma contribuição encontrada para este tipo" });
          }
          res.status(200).json(resposta);
      })
      .catch((error) => {
          console.error(error);
          res.status(500).json({ mensagem: "Erro ao buscar contribuições por tipo." });
      });
}

module.exports = {
  buscarPorId,
  cadastrar,
  listar,
  listarPorTipo
};
