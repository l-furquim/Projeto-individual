var vezesClicadas = 0;
var vezesClicadasFiltro = 0;
const opcoesPorCategoria = {
  bosses: [
    { value: "margit-o-pressagio-fel", text: "Margit, o Presságio Fell" },
    { value: "godrick-o-enxertado", text: "Godrick, o Enxertado" },
    { value: "lobo-vermelho-de-radagon", text: "Lobo Vermelho de Radagon" },
    { value: "rennala-rainha-da-lua-cheia", text: "Rennala, Rainha da Lua Cheia" },
    { value: "cavaleiro-real-loretta", text: "Cavaleiro Real Loretta" },
    { value: "radahn-flagelo-das-estrelas", text: "Radahn, Flagelo das Estrelas" },
    { value: "morgott-o-rei-dos-pressagios", text: "Morgott, o Rei dos Presságios" },
    { value: "gigante-de-fogo", text: "Gigante de Fogo" },
    { value: "mohg-senhor-do-sangue", text: "Mohg, Senhor do Sangue" },
    { value: "malenia-lamina-de-miquella", text: "Malenia, Lâmina de Miquella" },
    { value: "dupla-dos-peles-negras", text: "Dupla dos Peles Negras" },
    { value: "maliketh-a-lamina-negra", text: "Maliketh, a Lâmina Negra" },
    { value: "sir-gideon-ofnir", text: "Sir Gideon Ofnir" },
    { value: "godfrey-primeiro-lorde-elden", text: "Godfrey, Primeiro Lorde Elden" },
    { value: "radagon-da-ordem-dourada", text: "Radagon da Ordem Dourada" },
    { value: "fera-elden", text: "Fera Elden" }
  ],
  armas: [
    { value: "espada-longa", text: "Espada Longa" },
    { value: "machado-de-guerra", text: "Machado de Guerra" },
    { value: "arco-longo", text: "Arco Longo" },
    { value: "katana", text: "Katana" },
    { value: "lança", text: "Lança" },
    { value: "alabarda", text: "Alabarda" },
    { value: "espada-curta", text: "Espada Curta" },
    { value: "foice", text: "Foice" },
    { value: "adaga", text: "Adaga" },
    { value: "espada-gigante", text: "Espada Gigante" },
    { value: "martelo", text: "Martelo" },
    { value: "espada-sagrada", text: "Espada Sagrada" },
    { value: "tridente", text: "Tridente" },
    { value: "besta", text: "Besta" }
  ]
};

const categoriaSelect = document.getElementById("categoriaFiltro");
const opcoesSelect = document.getElementById("opcoes");

categoriaSelect.addEventListener("change", function () {
  opcoesSelect.innerHTML = '<option value="">Selecione uma opção</option>';

  const categoria = categoriaSelect.value;
  const opcoes = opcoesPorCategoria[categoria] || [];

  // Adiciona as novas opções
  opcoes.forEach(opcao => {
    const optionElement = document.createElement("option");
    optionElement.value = opcao.value;
    optionElement.textContent = opcao.text;
    opcoesSelect.appendChild(optionElement);
  });
});

function criarPost() {
  var container = containerNovoPost;

  window.onclick = function (event) {
    if (event.target == container) {
      container.style.display = "none";
    }
  }

  container.style.display = "flex"
}
function fecharModal() {
  var container = containerNovoPost;

  container.style.display = "none";
}

function mostrarComentarios(botao, id) {

  const contribuicao = botao.closest('li');
  
  const containerComentario = contribuicao.closest("div").querySelector("#containerSecaoComentario");
  console.log(contribuicao, containerComentario);

  if (vezesClicadas == 1) {
    vezesClicadas = 0;
    containerComentario.style.display = "none";
    botao.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-90deg-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M4.854 14.854a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V3.5A2.5 2.5 0 0 1 6.5 1h8a.5.5 0 0 1 0 1h-8A1.5 1.5 0 0 0 5 3.5v9.793l3.146-3.147a.5.5 0 0 1 .708.708z"/>
                    </svg>`;  
  } else {
    if (containerComentario) {
      vezesClicadas++;
      containerComentario.style.display = "flex";
      botao.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.854 14.854a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V3.5A2.5 2.5 0 0 1 6.5 1h8a.5.5 0 0 1 0 1h-8A1.5 1.5 0 0 0 5 3.5v9.793l3.146-3.147a.5.5 0 0 1 .708.708z"/>
      </svg>`
    }
  }
}

function comentar(botao, id) {
  const container = containerComentar;

  console.log(id);
  container.style.display = "flex";

  // Quando o botao que abre o modal de novo comentario e pressionado, eu coloco o onclick do formulario para executar com ese id específico(id Contribuição)
  botaoAdicionarComentario.onclick = () => adicionarComentario(id.id);

  console.log(botaoAdicionarComentario.onclick);
}

function fecharModalComentar() {
  const container = containerComentar;

  container.style.display = "none";
}
function fecharNovaContribuicao() {
  const container = containerNovoPost;

  container.style.display = "none";
}



async function adicionarComentario(idContribuicao) {
  const conteudo = textAreaConteudoComentario.value;

    console.log(idContribuicao);

    divMensagemComentario.innerHTML = "";
    textAreaConteudoComentario.style.border = "none";

  if (conteudo.length == 0) {
    divMensagemComentario.innerHTML = "Por favor insira um conteudo válido.";
    textAreaConteudoComentario.style.border = "solid 1px #600404";

  } else {
    var mensagem = "";
    var icone = "";
    var estilo = "";

    const idMaculado = JSON.parse(sessionStorage.getItem("id"));



    const resposta = await fetch("http://localhost:3333/comentarios/comentar", {
      method: "POST",
      body: JSON.stringify({
        conteudo: conteudo,
        fkContribuicao: idContribuicao,
        fkMaculado: idMaculado
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    botaoAdicionarComentario.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
          </svg>
          `


    if (resposta.ok) {
      mensagem = "Comentario realizado com sucesso!";
      icone = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
            </svg>`;

      estilo = "solid 1px #044e049c";

    } else {
      resposta.json().then((resposta) => {
        mensagem = resposta.mensagem;
      });

      icone = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>`;
      estilo = "solid 1px #600404";
    }

    setTimeout(() => {
      divMensagemComentario.innerHTML = mensagem;
      divMensagemComentario.style.border = estilo;
      botaoAdicionarComentario.innerHTML = icone;

      setTimeout(() => {
        location.reload();
      }, 1500);
    }, 1500);
  };

}

function irContaUsuario() {
  location.replace("../dashboard/dashboard.html");
}

async function novaContribuicao() {
  const titulo = inputTitulo.value;
  const conteudo = textAreaConteudoContribuicao.value;
  const tipoContribuicao = selectTipo.value;
  const filtro = categoriaFiltro.value;
  const conteudoFiltro = opcoes.value;
  
  var icone = "";


  divMensagemContribuicao.innerHTML = "";
  divMensagemContribuicao.style.border = "none";
  textAreaConteudoContribuicao.style.border = "none";
  inputTitulo.style.border = "none";
  categoriaFiltro.style.border = "none";
  opcoes.style.border = "none";

  if (conteudo.length == 0) {
    divMensagemContribuicao.innerHTML = "Conteudo inválido, deve conter no mínimo 1 caractere";
    divMensagemContribuicao.style.border = "solid 1px red";
    textAreaConteudoContribuicao.style.border = "solid 1px red";
  } else if (titulo.length == 0) {
    divMensagemContribuicao.innerHTML = "Título inválido, deve conter no mínimo 1 caractere";
    inputTitulo.style.border = "solid 1px red";
    divMensagemContribuicao.style.border = "solid 1px red";
  } else if (conteudo.length > 300) {
    divMensagemContribuicao.innerHTML = "Você passou do limite de caracteres permitidos para a contribuição (300).";
    textAreaConteudoContribuicao.style.border = "solid 1px red";
    divMensagemContribuicao.style.border = "solid 1px red";
  } else if (titulo.length > 30) {
    divMensagemContribuicao.innerHTML = "Você passou do limite de caracteres permitidos para o titulo (30).";
    inputTitulo.style.border = "solid 1px red";
    divMensagemContribuicao.style.border = "solid 1px red";
  } else if (filtro == "#") {
    divMensagemContribuicao.innerHTML = "Por favor, selecione a tag da contribuição.";
    categoriaFiltro.style.border = "solid 1px red";
    divMensagemContribuicao.style.border = "solid 1px red";
  } else if (conteudoFiltro == "#") {
    divMensagemContribuicao.innerHTML = "Por favor, selecione o conteudo da tag da contribuição.";
    opcoes.style.border = "solid 1px red";
    divMensagemContribuicao.style.border = "solid 1px red";
  } else {
    var mensagem = "";
    var estilo = "";
    botaoPostar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
          </svg>`;
    const idMaculado = JSON.parse(sessionStorage.getItem("id"));

    const resposta = await fetch("http://localhost:3333/contribuicao/cadastrar", {
      method: "POST",
      body: JSON.stringify({
        titulo: titulo,
        conteudo: conteudo,
        tipo: tipoContribuicao,
        fkMaculado: idMaculado,
        tag: filtro,
        conteudoTag: conteudoFiltro
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (resposta.ok) {
      mensagem = "Contribuição criada com sucesso!"
      icone = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
      </svg>`;
      estilo = "solid 1px #044e049c";

    } else {
      resposta.json().then(m => {
        mensagem = m.mensagem;
        icone = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>`;
        estilo = "solid 1px #600404";
      });

    }
    setTimeout(() => {
      divMensagemContribuicao.innerHTML = mensagem; // Nunca mais fazer isso...
      botaoPostar.innerHTML = icone;
      divMensagemContribuicao.style.border = estilo;
      // erroSenha.style.border = estilo;

      if (mensagem == "Contribuição criada com sucesso!") {
        setTimeout(() => {
          location.reload();
        }, 1000)
      }

    }, 2000);
  }
}

async function buscarContribuicoes() {
  const nome = JSON.parse(sessionStorage.getItem("nome"));
  abaUsuario.innerHTML += nome;


  const contribuicoes = await fetch("http://localhost:3333/contribuicao/listar", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });



  if (contribuicoes.ok) {
    const idMaculado = JSON.parse(sessionStorage.getItem("id"));

    const votos = await fetch(`http://localhost:3333/votos/maculado=${idMaculado}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (votos.ok) {
      const arrayContribuicao = await contribuicoes.json();

      if(votos.status != 204){
        const arrayVotos = await votos.json();
        const votosFks = arrayVotos.map((voto) => voto.fkContribuicao); 
        
        arrayContribuicao.forEach((contribuicao) => {
          
          const contribuicaoDoUsuario = contribuicao.nome == nome;

          const votoAtual = arrayVotos.find(v => v.fkContribuicao === contribuicao.idContribuicao);
          
          const idAtual = votoAtual ? votoAtual.idVoto : null;

          var contribuicaoCurtidaPeloUsuario = votosFks.includes(contribuicao.idContribuicao);
          
          listaContribuicoes.innerHTML += `
            <li class="liContribuicao" id=contribuicao${contribuicao.idContribuicao}>
              <div class="container-post ${contribuicao.contribuicaoFechada == 1 ? "container-post-fechado": ""}">
                <div class="cabecalho-post">
                  <h1 id="nome-post">${contribuicao.titulo}</h1>
                  
                  <div class="cabecalho-usuario">
                    <h1 id="usuario-post">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg> ${contribuicao.nome}
                  </h1>
                  </div>
                </div>
                <div class="container-tag">
                  <p>${contribuicao.tipo}</p>
                  <p>${contribuicao.tag}</p>
                  <p>${contribuicao.conteudoTag}</p>
                </div>
                <hr>
                <div class="desc-post">
                  <p>${contribuicao.conteudo}</p>
                </div>
                <div class="interacoes-post">
                  <div id="containerSecaoComentario">
                    <button id="botaoMostrarComentario" onclick="mostrarComentarios(this, contribuicao${contribuicao.idContribuicao})">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-arrow-90deg-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                          d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z" />
                      </svg>
                    </button>
                  </div>
                  ${contribuicaoDoUsuario ?
                `<div class="container-secao-fechar-contribuicao">
                  <button class="botao-fechar-contribuicao" id="botaoFecharContribuicao${contribuicao.idContribuicao}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                  </svg>
                  </button>
                </div>`
                : ""}
                  <div class="container-botao-like">
                    <button id="botaoVotar${contribuicao.idContribuicao}" onclick="votar( ${contribuicaoCurtidaPeloUsuario}, ${contribuicao.idContribuicao}, ${idAtual}, ${idMaculado} , ${contribuicao.votos} )">
                      ${contribuicaoCurtidaPeloUsuario ? 
                      `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                      </svg>` 
                      : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up-square" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                      </svg>`}
                      ${contribuicao.votos}
                    </button>
                  </div>
                  <div class="container-botao-comentario">
                    <button onclick="comentar(this,contribuicao${contribuicao.idContribuicao})">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat"
                        viewBox="0 0 16 16">
                        <path
                          d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                      </svg>
                      ${contribuicao.comentarios}
                    </button>
                  </div>
                </div>`;
              
            });
      }else{
        arrayContribuicao.forEach((contribuicao) => {
          const contribuicaoDoUsuario = contribuicao.nome == nome;
          console.log(contribuicaoDoUsuario);
          console.log("Nome do usuario: " + nome);

          listaContribuicoes.innerHTML += `
            <li class="liContribuicao" id=contribuicao${contribuicao.idContribuicao}>
              <div class="container-post ${contribuicao.contribuicaoFechada == 1 ? "container-post-fechado" : ""}">
                <div class="cabecalho-post">
                  <h1 id="nome-post">${contribuicao.titulo}</h1>
                  
                  <div class="cabecalho-usuario">
                    <h1 id="usuario-post">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg> ${contribuicao.nome}
                  </h1>
                  </div>
                </div>
                <div class="container-tag">
                  <p>${contribuicao.tipo}</p>
                  <p>${contribuicao.tag}</p>
                  <p>${contribuicao.conteudoTag}</p>
                </div>
                <hr>
                <div class="desc-post">
                  <p>${contribuicao.conteudo}</p>
                </div>
                <div class="interacoes-post">
                  <div id="containerSecaoComentario">
                    <button id="botaoMostrarComentario" onclick="mostrarComentarios(this, contribuicao${contribuicao.idContribuicao})">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-arrow-90deg-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                          d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z" />
                      </svg>
                    </button>
                  </div>
                  ${contribuicaoDoUsuario ?
                `<div class="container-secao-fechar-contribuicao">
                    <button class="botao-fechar-contribuicao" id="botaoFecharContribuicao${contribuicao.idContribuicao}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                      </svg>
                    </button>
                  </div>`
                : ""}
                  <div class="container-botao-like">
                    <button id="botaoVotar${contribuicao.idContribuicao}" onclick="votar(${false}, ${contribuicao.idContribuicao},${undefined},${idMaculado},${contribuicao.votos})">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up-square" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                      </svg>
                      ${contribuicao.votos}
                      </button>
                  </div>
                  <div class="container-botao-comentario">
                    <button onclick="comentar(this,contribuicao${contribuicao.idContribuicao})">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat"
                        viewBox="0 0 16 16">
                        <path
                          d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                      </svg>
                      ${contribuicao.comentarios}
                    </button>
                  </div>
                </div>`;
              
            })
      }

    }else{
      mensagem = resposta
    }

  }
}

async function votar(curtidoPeloUsuario, idContribuicao, idVoto,idMaculado,qtdVotos){
  console.log("votando");
  console.log(`Id do maculado: ${idMaculado}, ${idVoto}`);

  if(curtidoPeloUsuario){
    const resposta = await fetch(`http://localhost:3333/votos/desvotar/idVoto=${idVoto}&fkMculado=${idMaculado}&fkContribuicao=${idContribuicao}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

      document.getElementById(`botaoVotar${idContribuicao}`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up-square" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                      </svg> ${qtdVotos -1 }`;

    console.log(resposta);
    
  }else{
    const resposta = await fetch(`http://localhost:3333/votos/votar/fkMculado=${idMaculado}&fkContribuicao=${idContribuicao}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    document.getElementById(`botaoVotar${idContribuicao}`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                          </svg> ${qtdVotos + 1}`;

  }

}

async function pesquisarContribuicao(conteudoPesquisa){
  const nome = JSON.parse(sessionStorage.getItem("nome"));''

  const contribuicoes = await fetch(
              `http://localhost:3333/contribuicao//buscar/tipo=0&tag=0&conteudoTag=0`, {
    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conteudo: conteudoPesquisa
    })
  });



  if (contribuicoes.ok && contribuicoes.status != 204) {
    const idMaculado = JSON.parse(sessionStorage.getItem("id"));

    const votos = await fetch(`http://localhost:3333/votos/maculado=${idMaculado}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (votos.ok) {
      const arrayContribuicao = await contribuicoes.json();
      listaContribuicoes.innerHTML = `<div class="div-buscando-contribuicoes">Buscando contribuições <div class="roda-carregamento"></div></div>`;

      if(votos.status != 204){
        const arrayVotos = await votos.json();
        const votosFks = arrayVotos.map((voto) => voto.fkContribuicao); 

        setTimeout(()=> {
          listaContribuicoes.innerHTML = "";
          arrayContribuicao.forEach((contribuicao) => {
          
            const contribuicaoDoUsuario = contribuicao.nome == nome;
  
            const votoAtual = arrayVotos.find(v => v.fkContribuicao === contribuicao.idContribuicao);
            
            const idAtual = votoAtual ? votoAtual.idVoto : null;
  
            var contribuicaoCurtidaPeloUsuario = votosFks.includes(contribuicao.idContribuicao);
            
            listaContribuicoes.innerHTML += `
              <li class="liContribuicao" id=contribuicao${contribuicao.idContribuicao}>
                <div class="container-post ${contribuicao.contribuicaoFechada == 1 ? "container-post-fechado": ""}">
                  <div class="cabecalho-post">
                    <h1 id="nome-post">${contribuicao.titulo}</h1>
                    
                    <div class="cabecalho-usuario">
                      <h1 id="usuario-post">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                      </svg> ${contribuicao.nome}
                    </h1>
                    </div>
                  </div>
                  <div class="container-tag">
                    <p>${contribuicao.tipo}</p>
                    <p>${contribuicao.tag}</p>
                    <p>${contribuicao.conteudoTag}</p>
                  </div>
                  <hr>
                  <div class="desc-post">
                    <p>${contribuicao.conteudo}</p>
                  </div>
                  <div class="interacoes-post">
                    <div id="containerSecaoComentario">
                      <button id="botaoMostrarComentario" onclick="mostrarComentarios(this, contribuicao${contribuicao.idContribuicao})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                          class="bi bi-arrow-90deg-up" viewBox="0 0 16 16">
                          <path fill-rule="evenodd"
                            d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z" />
                        </svg>
                      </button>
                    </div>
                    ${contribuicaoDoUsuario ?
                  `<div class="container-secao-fechar-contribuicao">
                    <button class="botao-fechar-contribuicao" id="botaoFecharContribuicao${contribuicao.idContribuicao}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                    </svg>
                    </button>
                  </div>`
                  : ""}
                    <div class="container-botao-like">
                      <button id="botaoVotar${contribuicao.idContribuicao}" onclick="votar( ${contribuicaoCurtidaPeloUsuario}, ${contribuicao.idContribuicao}, ${idAtual}, ${idMaculado} , ${contribuicao.votos} )">
                        ${contribuicaoCurtidaPeloUsuario ? 
                        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                          <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                        </svg>` 
                        : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up-square" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                        </svg>`}
                        ${contribuicao.votos}
                      </button>
                    </div>
                    <div class="container-botao-comentario">
                      <button onclick="comentar(this,contribuicao${contribuicao.idContribuicao})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat"
                          viewBox="0 0 16 16">
                          <path
                            d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                        </svg>
                        ${contribuicao.comentarios}
                      </button>
                    </div>
                  </div>`;
                
              });
        }, 1500)
      }else{
        setTimeout(()=> {
          listaContribuicoes.innerHTML = "";
          arrayContribuicao.forEach((contribuicao) => {
            const contribuicaoDoUsuario = contribuicao.nome == nome;
            console.log(contribuicaoDoUsuario);
            console.log("Nome do usuario: " + nome);
  
            listaContribuicoes.innerHTML += `
              <li class="liContribuicao" id=contribuicao${contribuicao.idContribuicao}>
                <div class="container-post ${contribuicao.contribuicaoFechada == 1 ? "container-post-fechado" : ""}">
                  <div class="cabecalho-post">
                    <h1 id="nome-post">${contribuicao.titulo}</h1>
                    
                    <div class="cabecalho-usuario">
                      <h1 id="usuario-post">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                      </svg> ${contribuicao.nome}
                    </h1>
                    </div>
                  </div>
                  <div class="container-tag">
                    <p>${contribuicao.tipo}</p>
                    <p>${contribuicao.tag}</p>
                    <p>${contribuicao.conteudoTag}</p>
                  </div>
                  <hr>
                  <div class="desc-post">
                    <p>${contribuicao.conteudo}</p>
                  </div>
                  <div class="interacoes-post">
                    <div id="containerSecaoComentario">
                      <button id="botaoMostrarComentario" onclick="mostrarComentarios(this, contribuicao${contribuicao.idContribuicao})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                          class="bi bi-arrow-90deg-up" viewBox="0 0 16 16">
                          <path fill-rule="evenodd"
                            d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z" />
                        </svg>
                      </button>
                    </div>
                    ${contribuicaoDoUsuario ?
                  `<div class="container-secao-fechar-contribuicao">
                      <button class="botao-fechar-contribuicao" id="botaoFecharContribuicao${contribuicao.idContribuicao}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                        </svg>
                      </button>
                    </div>`
                  : ""}
                    <div class="container-botao-like">
                      <button id="botaoVotar${contribuicao.idContribuicao}" onclick="votar(${false}, ${contribuicao.idContribuicao},${undefined},${idMaculado},${contribuicao.votos})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up-square" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                        </svg>
                        ${contribuicao.votos}
                        </button>
                    </div>
                    <div class="container-botao-comentario">
                      <button onclick="comentar(this,contribuicao${contribuicao.idContribuicao})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat"
                          viewBox="0 0 16 16">
                          <path
                            d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                        </svg>
                        ${contribuicao.comentarios}
                      </button>
                    </div>
                  </div>`;
              })
        },1500)

      }

    }

  }else{
    listaContribuicoes.innerHTML = "";
           
  }
}
function abrirFiltro(){
  const container = conteudoFiltro;
  if(vezesClicadasFiltro == 1){
    vezesClicadasFiltro = 0;
    container.style.display = "none";
  }else{
    vezesClicadasFiltro++;
    container.style.display = "flex";
  }
}
function validarCheckBox(check){
  if(check.checked){
    console.log("CHACKADO");
    selectTag.style.display = "flex";
  }else{
    selectTag.style.display = "none";
  }


}