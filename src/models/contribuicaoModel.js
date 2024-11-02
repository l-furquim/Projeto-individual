var database = require("../database/config");
var sqlUtils = require("../utils/sql");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM Contribuicao WHERE idContribuicao = ${id}`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `
                    SELECT c.idContribuicao,
                        c.titulo,
                        c.conteudo, 
                        c.contribuicaoFechada, 
                        (SELECT COUNT(*) FROM Voto WHERE fkContribuicao = idContribuicao) as votos,
                        (SELECT COUNT(*) FROM Comentario WHERE fkContribuicao = idContribuicao) as comentarios,
                        c.tipo,
                        c.tag,
                        c.conteudoTag,
                        m.nome
                        FROM Contribuicao AS c
                        JOIN Maculado AS m ON c.fkMaculado = m.idMaculado ORDER BY c.votos;
                   `;

  return database.executar(instrucaoSql);
}

/* function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
} */

function cadastrar(titulo, conteudo, tipo, fkMaculado, tag, conteudoTag) {
  const data = new Date();
  const dataFormatada = sqlUtils.formatarDataParaSQL(data);

  var instrucaoSql = 
    `INSERT INTO Contribuicao (titulo,conteudo, dtContribuicao,contribuicaoFechada,votos,comentarios,tipo,fkMaculado, tag, conteudoTag) VALUES 
    ('${titulo}','${conteudo}','${dataFormatada}',${false},${0},${0},'${tipo}','${fkMaculado}','${tag}','${conteudoTag}')`;

  return database.executar(instrucaoSql);
}

function buscarPorTipo(tipo) {
  const instrucaoSql = `
                       SELECT c.titulo, 
                        c.conteudo, 
                        c.contribuicaoFechada, 
                        c.votos, 
                        c.comentarios,
                        c.tipo,
                        c.tag,
                        c.conteudoTag,
                        m.nome
                        FROM Contribuicao AS c
                        JOIN Maculado AS m ON c.fkMaculado = m.idMaculado
                        WHERE c.tipo = ${tipo} AND c.fkContribuicaoRespondida = 0;
                      `
  return database.executar(instrucaoSql);
} 

module.exports = {
  buscarPorId, 
  cadastrar, 
  listar,
  buscarPorTipo
};
