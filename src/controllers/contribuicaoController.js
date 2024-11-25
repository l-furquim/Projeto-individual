var contribuicaoModel = require("../models/contribuicaoModel");
const { formatarDataParaSQL } = require("../utils/sql");

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
  console.log(`Fk do maculado : ` + fkMaculado);
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

function buscar(req, res){
  const conteudo = req.body.conteudo.split(" ");
  const tipo = req.params.tipo;
  const tag = req.params.tag;
  const conteudoTag = req.params.conteudoTag;
  console.log("Executando pesquisa...");

/*   if(conteudo == undefined){
    res.status(401).json({mensagem: "Por favor procure por um conteudo válido"});
  } */

  if(conteudo == "" && tipo != 0 && tag == 0){
    contribuicaoModel.buscarApenasPorTipo(tipo).then((resposta)=>{
      if(resposta.length != 0){
        return res.status(200).json(resposta);
      }
      return res.status(204).json({contribuicoes: []});

    }).catch((error) => {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar contribuições pelo conteudo." });
    })

  }else if(conteudo == "" && tipo == 0 && tag != 0){
    contribuicaoModel.buscarApenasPorTag(tag).then((resposta)=>{
      if(resposta.length != 0){
        return res.status(200).json(resposta);
      }
      return res.status(204).json({contribuicoes: []});

    }).catch((error) => {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar contribuições pelo conteudo." });
    })
  }else if(conteudo == "" && tipo != 0 && tag != 0){
    console.log("Buscando por apenas tag e filtro...")
    contribuicaoModel.buscarApenasPorTagETipo(tag, tipo).then((resposta)=>{
      if(resposta.length != 0){
        return res.status(200).json(resposta);
      }
      return res.status(204).json({contribuicoes: []});

    }).catch((error) => {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar contribuições pelo conteudo." });
    })
  }else if(tipo == 0 && tag == 0){
    contribuicaoModel.buscarApenasPorConteudo(conteudo).then((resposta)=>{
      console.log("Executando pesquisa apenas por conteudo");
      if(resposta.length != 0){
        return res.status(200).json(resposta);
      }
      return res.status(204).json({contribuicoes: []});

    }).catch((error) => {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar contribuições pelo conteudo." });
    })
  }else if(tipo == 0 && tag != 1){
    contribuicaoModel.buscarPorConteudoETag(conteudo, tag).then((resposta)=>{
      if(resposta.length != 0){
        return res.status(200).json(resposta);
      }
      return res.status(204).json({contribuicoes: []});

    }).catch((error) => {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar contribuições pelo conteudo." });
    })
  }else if(tipo != 0 && tag != 0){
    contribuicaoModel.buscarPorConteudoTagETipo(conteudo, tag,tipo).then((resposta)=>{
      if(resposta.length != 0){
        return res.status(200).json(resposta);
      }
      return res.status(204).json({contribuicoes: []});

    }).catch((error) => {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar contribuições pelo conteudo." });
    })
  }else if(tipo != 0 && tag == 0){
    contribuicaoModel.buscarPorConteudoETipo(conteudo, tipo).then((resposta)=>{
      if(resposta.length != 0){
        return res.status(200).json(resposta);
      }
      return res.status(204).json({contribuicoes: []});

    }).catch((error) => {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar contribuições pelo conteudo." });
    })
  }
};

function fechar(req, res){
  const idContribuicao = req.params.idContribuicao;
  const idComentario = req.params.idComentario;
  const dtFechamento = formatarDataParaSQL(new Date());


  console.log(idContribuicao, idComentario);

  if(idContribuicao == undefined){
    res.status(401).json({mensagem: "O id da contribuição esta undefined"});
  }
  if(idComentario == undefined){
    res.status(401).json({mensagem: "O id do comentario por fechar a contribuição esta undefined"});
  }

    contribuicaoModel.fechar(idContribuicao, idComentario,dtFechamento)
            .then(()=> {  
              res.status(201).json({mensagem: "Contribuição fechada com sucesso!"});
              }).catch((erro)=> {
              console.error(erro);
              res.status(500).json({ mensagem: `Erro ao fechar contribuição ${erro}` });
            });
}

module.exports = {
  buscarPorId,
  cadastrar,
  listar,
  listarPorTipo,
  buscar,
  fechar
};
