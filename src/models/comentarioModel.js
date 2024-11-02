var database = require("../database/config");

function comentar(conteudo, fkContribuicao, fkMaculado) {
  const dataJs = new Date(); 

  const dataISO = dataJs.toISOString(); 

  const dataSql = dataISO.slice(0, 19).replace('T', ' ');


  var instrucaoSql = `INSERT INTO Comentario (conteudo,fkContribuicao, fkMaculado, responsavelPorFechar,qtdVotos,dtComentario)
                      VALUES ('${conteudo}', ${fkContribuicao}, ${fkMaculado}, ${false}, ${0}, '${dataSql}');`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listar() {
  
  var instrucaoSql = `SELECT * FROM Comentario;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  comentar,
  listar
}
