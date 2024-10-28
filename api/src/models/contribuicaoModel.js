var database = require("../database/config");
var sqlUtils = require("../utils/sql");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM Contribuicao WHERE idContribuicao = ${id}`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `
                    SELECT c.conteudo AS conteudo_contribuicao, 
                        c.contribuicaoFechada, 
                        c.votos, 
                        c.tipo AS tipo_contribuicao,
                        r.conteudo AS conteudo_resposta, 
                        r.contribuicaoFechada AS contribuicaoFechada_resposta, 
                        r.votos AS votos_resposta, 
                        r.tipo AS tipo_resposta, 
                        m.nome
                        FROM Contribuicao AS c
                        LEFT JOIN Contribuicao AS r ON c.fkResposta = r.idContribuicao
                        JOIN Maculado AS m ON c.fkMaculado = m.idMaculado;
                   `;

  return database.executar(instrucaoSql);
}

/* function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
} */

function cadastrar(conteudo, tipo, fkMaculado) {
  const data = new Date();
  const dataFormatada = sqlUtils.formatarDataParaSQL(data);

  var instrucaoSql = 
    `INSERT INTO Contribuicao (conteudo, dtContribuicao,contribuicaoFechada,votos,tipo,fkMaculado, fkResposta) VALUES 
    ('${conteudo}','${dataFormatada}',${false},'${0}', '${tipo}','${fkMaculado}', ${null})`;

  return database.executar(instrucaoSql);
}

function buscarPorTipo(tipo) {
  const instrucaoSql = `
                       SELECT c.conteudo AS conteudo_contribuicao, 
                        c.contribuicaoFechada, 
                        c.votos, 
                        c.tipo AS tipo_contribuicao,
                        r.conteudo AS conteudo_resposta, 
                        r.contribuicaoFechada AS contribuicaoFechada_resposta, 
                        r.votos AS votos_resposta, 
                        r.tipo AS tipo_resposta, 
                        m.nome
                        FROM Contribuicao AS c
                        LEFT JOIN Contribuicao AS r ON c.fkResposta = r.idContribuicao
                        JOIN Maculado AS m ON c.fkMaculado = m.idMaculado
                        WHERE c.tipo = ${tipo};
                      `
  return database.executar(instrucaoSql);
} 


module.exports = {
  buscarPorId, 
  cadastrar, 
  listar,
  buscarPorTipo
};
