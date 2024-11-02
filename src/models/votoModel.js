var database = require("../database/config");

function criarVoto(fkMaculado, fkContribuicao) {
    var instrucaoSql = `INSERT INTO Voto (fkContribuicao, fkMaculado) VALUES
    (${fkContribuicao}, ${fkMaculado});`;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarVotosPeloIdMaculado(fkMaculado) {

    var instrucaoSql = `SELECT Voto.fkContribuicao, Voto.idVoto
    FROM Voto
       WHERE Voto.fkMaculado = ${fkMaculado}
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function desvotar(fkMaculado, fkContribuicao, idVoto){    
    const instrucaoSql = `DELETE FROM Voto WHERE idVoto = ${idVoto};`

    return database.executar(instrucaoSql);
}

module.exports = {
    criarVoto,
    buscarVotosPeloIdMaculado,
    desvotar
}
