var database = require("../database/config");

function criarNovoVoto(fkMaculado, fkContribuicao) {
    var instrucaoSql = `INSERT INTO Voto (fkContribuicao, fkMaculado) VALUES
    (${fkContribuicao}, ${fkMaculado});`;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarVotosPeloIdMaculado(fkMaculado) {

    var instrucaoSql = `SELECT Voto.fkContribuicao
    FROM Voto
       WHERE Voto.fkMaculado = ${fkMaculado}
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    criarNovoVoto,
    buscarVotosPeloIdMaculado
}
