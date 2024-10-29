var votoModel = require("../models/votoModel");

function criarNovoVoto(req, res) {
    const fkMaculado = req.query.fkMaculado;
    const fkContribuicao = req.query.fkContribuicao;
    if(fkMaculado.length == 0 || fkContribuicao == 0){
        return res.status(401).json({mensagem: "Fk invalida!"});
    }

    votoModel.criarVoto(fkMaculado, fkContribuicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao criar o voto.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarVotosPeloIdMaculado(req, res) {
    const fkMaculado = req.params.fkMaculado;
   
    if(fkMaculado.length == 0){
        return res.status(401).json({mensagem: "Fk invalida!"});
    }

    votoModel.buscarVotosPeloIdMaculado(fkMaculado).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).json({resultado: []})
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    criarNovoVoto,
    buscarVotosPeloIdMaculado
}