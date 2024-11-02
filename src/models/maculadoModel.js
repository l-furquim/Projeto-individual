var database = require("../database/config")
var sqlUtils = require("../utils/sql"); 


async function autenticar(email, senha) {
    const linhas = await buscarMaculadoPorEmailESenha(email,senha);
    
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    return linhas
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
    const instrucaoSql = `SELECT * FROM Maculado WHERE email = '${email}';
                        `
    return database.executar(instrucaoSql);
}
function buscarMaculadoPorNome(nome){
    const instrucaoSql = `SELECT * FROM Maculado WHERE nome = '${nome}';
                        `
    return database.executar(instrucaoSql);
}

async function buscarMaculadoPorEmailESenha(email, senha){
    const instrucaoSql = `SELECT idMaculado, nome, email, contribuicoes, maculadosAjudados FROM Maculado WHERE email = '${email}' AND senha = '${senha}'`;  
    const linhas = await database.executar(instrucaoSql);
    return linhas; 
}

module.exports = {
    autenticar,
    cadastrar,
    buscarMaculadoPorEmail,
    buscarMaculadoPorNome,
    buscarMaculadoPorEmailESenha
};