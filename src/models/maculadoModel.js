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
                                (SELECT COUNT(idComentario)
                                FROM Comentario
                                WHERE fkMaculado = m.idMaculado
                                AND responsavelPorFechar = 1) AS contribuicoesFechadas,
                                (SELECT COUNT(*) 
                                FROM Contribuicao 
                                WHERE fkMaculado = m.idMaculado) AS contribuicoes,
                                (SELECT COUNT(v.idVoto)
                                FROM Voto v
                                JOIN Contribuicao c ON v.fkContribuicao = c.idContribuicao
                                WHERE c.fkMaculado = m.idMaculado) AS votos,
                                (SELECT 
                                    MIN(TIMESTAMPDIFF(MINUTE, c.dtContribuicao, c.dtFechamento)) AS "tempoMinimo"
                                FROM 
                                    Contribuicao c
                                JOIN 
                                    Maculado m ON c.fkMaculado = m.idMaculado
                                WHERE 
                                    c.contribuicaoFechada = TRUE
                                    AND c.dtFechamento IS NOT NULL
                                    AND m.idMaculado = ${idMaculado}) as tempoMinimo,
                                DATE_FORMAT(c.dtContribuicao, '%Y-%m') AS mesContribuicao, 
                                COUNT(*) AS qtdContribuicaoMes
                            FROM 
                                Maculado m
                            JOIN 
                                Contribuicao c ON c.fkMaculado = m.idMaculado
                            WHERE 
                                m.idMaculado = ${idMaculado}
                            GROUP BY 
                                m.idMaculado, mesContribuicao
                            ORDER BY 
                                mesContribuicao;`
    return database.executar(instrucaoSql);
                            
}

function buscarContribuicoesMaisVotadas(idMaculado){
    const instrucaoSql = `                        
                                SELECT 
                                    c.titulo AS "titulo", 
                                    COUNT(DISTINCT v.idVoto) AS "totalVotos" 
                                FROM 
                                    Contribuicao c
                                LEFT JOIN 
                                    Voto v ON v.fkContribuicao = c.idContribuicao
                                LEFT JOIN 
                                    Maculado m ON c.fkMaculado = m.idMaculado
                                WHERE 
                                    m.idMaculado = ${idMaculado}
                                GROUP BY 
                                    c.idContribuicao, c.titulo
                                ORDER BY 
                                    COUNT(DISTINCT v.idVoto) DESC
                                LIMIT 5;

                        `
    return database.executar(instrucaoSql);
}

function buscarComentariosFechadosPorMeses(idMaculado){
    var instrucaoSql = `
                       SELECT COUNT(idComentario)
                            (SELECT dtFechamento FROM Contribuicao
                                WHERE fkComentarioResponsavel = idComentario)
                                FROM Comentario
                                WHERE fkMaculado = ${idMaculado}
                                AND responsavelPorFechar = 1) AS contribuicoesFechadas;
                        `
}

module.exports = {
    autenticar,
    cadastrar,
    buscarMaculadoPorEmail,
    buscarMaculadoPorNome,
    buscarMaculadoPorEmailESenha,
    buscarDados,
    buscarContribuicoesMaisVotadas
};