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

function buscarDados(idMaculado){
    const instrucaoSql = `SELECT 
                            m.nome,
                            (SELECT COUNT(*)
                            FROM Comentario
                            WHERE fkMaculado = ${idMaculado}
                            AND responsavelPorFechar = 1) as contribuicoesFechadas',
                            (SELECT COUNT(*) FROM Contribuicao WHERE fkMaculado = ${idMaculado}) as contribuicoes,
                            (SELECT COUNT(v.idVoto) 
                            FROM Voto v
                            JOIN Contribuicao as c ON v.fkContribuicao = c.idContribuicao
                            WHERE c.fkMaculado = 2;) as votos 
                            FROM maculado as m;`
                            
}

module.exports = {
    autenticar,
    cadastrar,
    buscarMaculadoPorEmail,
    buscarMaculadoPorNome,
    buscarMaculadoPorEmailESenha,
    buscarDados
};