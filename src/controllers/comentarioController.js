var comentarioModel = require("../models/comentarioModel");

function comentar(req, res) {
  const conteudo = req.body.conteudo;
  const fkContribuicao = req.body.fkContribuicao;
  const fkMaculado = req.body.fkMaculado; 

  // Conversão para o tipo string para remover o termo contribuicao utilizado para mapear, e após isso busca pelo indice um que por padrao eh o numero da contribuicao
  const fkContribuicaoString = fkContribuicao.toString().split("contribuicao")[1];

  if(conteudo == undefined){
    res.status(401).json({mensagem: "Por favor insira um conteudo válido para o comentario"})
  }else if(fkContribuicao == undefined){
    res.status(401).json({mensagem: "Por favor insira o id da contribuicao válida para o comentario"})
  }else if(fkMaculado == undefined){
    res.status(401).json({mensagem: "Por favor insira um id de maculado válido para o comentario"})
  }

  comentarioModel.comentar(conteudo, fkContribuicaoString, fkMaculado).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json({mensagem: "Não foi possivel fazer o comentario "});
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao comentar: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function listar(req, res) {

    comentarioModel.listar()
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao buscar os comentarios! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }

module.exports = {
  comentar,
  listar
}