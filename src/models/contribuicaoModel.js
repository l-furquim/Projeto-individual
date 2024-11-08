const { query } = require("express");
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
                        c.fkComentarioResponsavel,
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
    `INSERT INTO Contribuicao (titulo,conteudo, dtContribuicao,contribuicaoFechada,fkComentarioResponsavel,votos,comentarios,tipo,fkMaculado, tag, conteudoTag) VALUES 
    ('${titulo}','${conteudo}','${dataFormatada}',${false},${null},${0},${0},'${tipo}',${fkMaculado},'${tag}','${conteudoTag}')`;

  return database.executar(instrucaoSql);
}

function buscarPorTipo(tipo) {
  const instrucaoSql = `
                       SELECT c.idContribuicao,
                        c.titulo, 
                        c.conteudo, 
                        c.contribuicaoFechada,
                        (SELECT COUNT(*) FROM Voto WHERE fkContribuicao = idContribuicao) as votos,
                        (SELECT COUNT(*) FROM Comentario WHERE fkContribuicao = idContribuicao) as comentarios,
                        c.fkComentarioResponsavel,
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

function buscarApenasPorConteudo(palavras){

  let queryInicial = `SELECT
                        c.idContribuicao,
                        c.titulo, 
                        c.conteudo, 
                        c.contribuicaoFechada,
                        (SELECT COUNT(*) FROM Voto WHERE fkContribuicao = idContribuicao) as votos,
                        (SELECT COUNT(*) FROM Comentario WHERE fkContribuicao = idContribuicao) as comentarios,
                        c.fkComentarioResponsavel,
                        c.tipo,
                        c.tag,
                        c.conteudoTag,
                        m.nome
                        FROM Contribuicao AS c
                        JOIN Maculado AS m ON c.fkMaculado = m.idMaculado WHERE `;

  queryInicial += palavras.map(palavra => `c.conteudo LIKE '%${palavra}%'`).join(' OR ');
  
  return database.executar(queryInicial + "COLLATE utf8mb4_general_ci;")
};

function buscarPorConteudoETag(palavras, tag){

  console.log("Buscando por tag e conteudo !")

  let queryInicial = `SELECT 
                        c.idContribuicao,
                        c.titulo, 
                        c.conteudo, 
                        c.contribuicaoFechada,
                        (SELECT COUNT(*) FROM Voto WHERE fkContribuicao = idContribuicao) as votos,
                        (SELECT COUNT(*) FROM Comentario WHERE fkContribuicao = idContribuicao) as comentarios,
                        c.fkComentarioResponsavel,
                        c.tipo,
                        c.tag,
                        c.conteudoTag,
                        m.nome
                        FROM Contribuicao AS c
                        JOIN Maculado AS m ON c.fkMaculado = m.idMaculado WHERE `;

  queryInicial += palavras.map(palavra => `c.conteudo LIKE '%${palavra}%'`).join(' OR ');
  
  return database.executar(queryInicial + `AND c.tag = '${tag}' COLLATE utf8mb4_general_ci;`);

}
function buscarPorConteudoTagETipo(palavras, tag, tipo){
  console.log("Buscando por tag, conteudo e tipo !")

  let queryInicial = `SELECT 
                        c.idContribuicao,
                        c.titulo, 
                        c.conteudo, 
                        c.contribuicaoFechada,
                        (SELECT COUNT(*) FROM Voto WHERE fkContribuicao = idContribuicao) as votos,
                        (SELECT COUNT(*) FROM Comentario WHERE fkContribuicao = idContribuicao) as comentarios,
                        c.fkComentarioResponsavel,
                        c.tipo,
                        c.tag,
                        c.conteudoTag,
                        m.nome
                        FROM Contribuicao AS c
                        JOIN Maculado AS m ON c.fkMaculado = m.idMaculado WHERE `;

  queryInicial += palavras.map(palavra => `c.conteudo LIKE '%${palavra}%'`).join(' OR ');
  
  return database.executar(queryInicial + `AND c.tag = '${tag}' AND c.tipo = '${tipo}' COLLATE utf8mb4_general_ci;`);
}
function buscarPorConteudoETipo(palavras, tipo){
  console.log("Buscando por tipo e conteudo !")

  let queryInicial = `SELECT 
                        c.idContribuicao,
                        c.titulo, 
                        c.conteudo, 
                        c.contribuicaoFechada,
                        (SELECT COUNT(*) FROM Voto WHERE fkContribuicao = idContribuicao) as votos,
                        (SELECT COUNT(*) FROM Comentario WHERE fkContribuicao = idContribuicao) as comentarios,
                        c.fkComentarioResponsavel,
                        c.tipo,
                        c.tag,
                        c.conteudoTag,
                        m.nome
                        FROM Contribuicao AS c
                        JOIN Maculado AS m ON c.fkMaculado = m.idMaculado WHERE `;

  queryInicial += palavras.map(palavra => `c.conteudo LIKE '%${palavra}%'`).join(' OR ');
  
  return database.executar(queryInicial + `AND c.tipo = '${tipo}' COLLATE utf8mb4_general_ci;`);
}
function buscarApenasPorTipo(tipo){
    let instrucaoSql = `SELECT 
    c.idContribuicao,
    c.titulo, 
    c.conteudo, 
    c.contribuicaoFechada,
    (SELECT COUNT(*) FROM Voto WHERE fkContribuicao = idContribuicao) as votos,
    (SELECT COUNT(*) FROM Comentario WHERE fkContribuicao = idContribuicao) as comentarios,
    c.fkComentarioResponsavel,
    c.tipo,
    c.tag,
    c.conteudoTag,
    m.nome
    FROM Contribuicao AS c
    JOIN Maculado AS m ON c.fkMaculado = m.idMaculado WHERE c.tipo = '${tipo}'`;

    return database.executar(instrucaoSql);
}

function buscarApenasPorTag(tag){
  let instrucaoSql = `SELECT 
    c.idContribuicao,
    c.titulo, 
    c.conteudo, 
    c.contribuicaoFechada,
    (SELECT COUNT(*) FROM Voto WHERE fkContribuicao = idContribuicao) as votos,
    (SELECT COUNT(*) FROM Comentario WHERE fkContribuicao = idContribuicao) as comentarios,
    c.fkComentarioResponsavel,
    c.tipo,
    c.tag,
    c.conteudoTag,
    m.nome
    FROM Contribuicao AS c
    JOIN Maculado AS m ON c.fkMaculado = m.idMaculado WHERE c.tag = '${tag}'`;

    return database.executar(instrucaoSql);
}
function buscarApenasPorTagETipo(tag, tipo){
  let instrucaoSql = `SELECT 
  c.idContribuicao,
  c.titulo, 
  c.conteudo, 
  c.contribuicaoFechada,
  (SELECT COUNT(*) FROM Voto WHERE fkContribuicao = idContribuicao) as votos,
  (SELECT COUNT(*) FROM Comentario WHERE fkContribuicao = idContribuicao) as comentarios,
  c.fkComentarioResponsavel,
  c.tipo,
  c.tag,
  c.conteudoTag,
  m.nome
  FROM Contribuicao AS c
  JOIN Maculado AS m ON c.fkMaculado = m.idMaculado WHERE c.tag = '${tag}' AND c.tipo = '${tipo}'`;

  return database.executar(instrucaoSql);
}

function fechar(idContribuicao, idComentario){
  const instrucaoSql = 
  `UPDATE Contribuicao SET contribuicaoFechada = ${true}, fkComentarioResponsavel = ${idComentario} WHERE idContribuicao = ${idContribuicao}`

  return database.executar(instrucaoSql);
}


module.exports = {
  buscarPorId, 
  cadastrar, 
  listar,
  buscarPorTipo,
  buscarApenasPorConteudo,
  buscarPorConteudoETag,
  buscarPorConteudoTagETipo,
  buscarPorConteudoETipo,
  buscarApenasPorTipo,
  buscarApenasPorTag,
  buscarApenasPorTagETipo,
  fechar
};
