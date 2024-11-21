const { authPlugins } = require("mysql2");
var maculadoModel = require("../models/maculadoModel");

async function autenticar(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        try {
            const autenticado = await maculadoModel.autenticar(email, senha);
            if (autenticado.length > 0) {
                res.status(201).json(autenticado);
            } else {
                res.status(401).json({ mensagem: "Email ou senha inválidos" });
            }
        } catch (erro) {
            console.log("Houve um erro ao realizar o login! Erro: ", erro);
            res.status(500).json(erro);
        }
    }
}

async function cadastrar(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        try {
            const resultadoEmail = await maculadoModel.buscarMaculadoPorEmail(email);
            if (resultadoEmail.length > 0) {
                res.status(401).json({ mensagem: "Já existe um maculado com esse email" });
            } else {
                const resultadoNome = await maculadoModel.buscarMaculadoPorNome(nome);
                if (resultadoNome.length > 0) {
                    res.status(401).json({ mensagem: "Já existe um maculado com esse nome" });
                } else {
                    const resultado = await maculadoModel.cadastrar(nome, email, senha);
                    res.json(resultado);
                }
            }
        } catch (erro) {
            console.log("Houve um erro ao realizar o cadastro! Erro: ", erro);
            res.status(500).json(erro);
        }
    }
}
async function buscarDados(req, res){
    const idMaculado = req.params.idMaculado;

    if(idMaculado == undefined){
        res.status(401).json({mensagem: "Id do maculado esta undefined"});
    }
    try{
    const respostaUm = await maculadoModel.buscarDados(idMaculado);
    console.log(respostaUm + idMaculado)
        if(respostaUm.length > 0){
            const respostaDois = await maculadoModel.buscarContribuicoesMaisVotadas(idMaculado);

            if(respostaDois.length > 0){

                const respostaTres = await maculadoModel.buscarComentariosFechadosPorMeses(idMaculado);

                if(respostaTres.length > 0){
                    return res.status(201).json({
                        respostaUm,
                        respostaDois,
                        respostaTres
                    });
                }else{
                    return res.status(201).json({
                        respostaUm,
                        respostaDois,
                        respostaTres: []
                    });
                }
            }else{
                return res.status(201).json({
                    respostaUm,
                    respostaDois: []
                });
            }
            
        }else{
            return res.status(204).json([]);
        }
    }catch(erro){
        console.log("Houve um erro ao buscar os dados do maculado! Erro: ", erro);
        res.status(500).json(erro);
    }
}

function buscarRanking(req ,res){
    maculadoModel.buscarRanking().then(function (resposta){
        if(resposta.length > 0){
            res.status(200).json(resposta);
        }else{
            res.status(204).json([]);
        }
}).catch((erro) => {
    console.log(erro);
    res.status(500).json(erro);
})
}


module.exports = {
    autenticar,
    cadastrar,
    buscarDados,
    buscarRanking
};
