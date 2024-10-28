var database = require("../database/config")
var sqlUtils = require("../utils/sql"); 


function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, fk_empresa as empresaId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    const data = new Date();
    

    const dataFormatada = sqlUtils.formatarDataParaSQL(data); 
    
    var instrucaoSql = `
        INSERT INTO Maculado (nome, email, senha,dtCriacao, contribuicoes, maculadosAjudados) VALUES ('${nome}', '${email}', '${senha}', '${dataFormatada}', '${0}', '${0}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMaculadoPorEmail(email){
    const instrucaoSql = `SELECT * FROM Maculado WHERE email = ${email};
                        `
    return database.executar(instrucaoSql);
}
function buscarMaculadoPorNome(nome){
    const instrucaoSql = `SELECT * FROM Maculado WHERE nome = ${nome};
                        `
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarMaculadoPorEmail,
    buscarMaculadoPorNome
};