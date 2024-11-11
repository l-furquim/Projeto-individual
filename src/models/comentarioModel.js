var database = require("../database/config");

function comentar(conteudo, fkContribuicao, fkMaculado, data) {

  var instrucaoSql = `INSERT INTO Comentario (conteudo,fkContribuicao, fkMaculado, responsavelPorFechar,qtdVotos,dtComentario)
                      VALUES ('${conteudo}', ${fkContribuicao}, ${fkMaculado}, ${false}, ${0}, '${data}');`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listar() {
  
  var instrucaoSql = `SELECT 
                        c.idComentario,
                        c.conteudo,
                        c.fkContribuicao,
                        m.nome as nome,
                        c.responsavelPorFechar,
                        c.qtdVotos,
                        c.dtComentario
                          FROM Comentario as c
                              JOIN Maculado as m 
                                ON c.fkMaculado = m.idMaculado ORDER BY c.responsavelPorFechar DESC;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function fechar(idComentario){
  const instrucaoSql = `UPDATE Comentario SET responsavelPorFechar = true WHERE idComentario = ${idComentario};`;

  return database.executar(instrucaoSql);
}


module.exports = {
  comentar,
  listar,
  fechar
}
