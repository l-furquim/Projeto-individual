var vezesClicadas = 0;

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

categoriaSelect.addEventListener("change", function() {
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
  
  window.onclick = function(event){
    if(event.target == container){
      container.style.display = "none";
    }
  }

  container.style.display = "flex"
}
function fecharModal() {
  var container = containerNovoPost;

  container.style.display = "none";
}

function mostrarComentarios(botao, id){

  const contribuicao = botao.closest('li');
  const containerComentario = contribuicao.querySelector('#containerComentario');
  console.log(contribuicao, containerComentario)
  
  if(vezesClicadas == 1){
    vezesClicadas = 0;
    containerComentario.style.display = "none";
    botaoMostrarComentario.innerHTML  = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-up" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z"/>
    </svg>`
  }else{
    if(containerComentario){
      vezesClicadas++;
      containerComentario.style.display = "flex";
      botaoMostrarComentario.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.854 14.854a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V3.5A2.5 2.5 0 0 1 6.5 1h8a.5.5 0 0 1 0 1h-8A1.5 1.5 0 0 0 5 3.5v9.793l3.146-3.147a.5.5 0 0 1 .708.708z"/>
      </svg>`
    }
  }
}

function comentar(botao, id){
  // console.log(id.closest('div').querySelector("#containerSecaoComentario"));

  const container = containerComentar;

  console.log(id);
  container.style.display = "flex";
}

function fecharModalComentar(){
  const container = containerComentar;

  container.style.display = "none";
}
function fecharNovaContribuicao(){
  const container = containerNovoPost;

  container.style.display = "none";
}



function adicionarComentario(conteudo){
  botaoAdicionarComentario.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
        </svg>
        `
  console.log(conteudo);
  setTimeout(()=> {
    botaoAdicionarComentario.innerHTML = `Comentario realizado com sucesso ! `
    setTimeout(()=> {
      location.reload();
    }, 1000);
  }, 1500);
}

function irContaUsuario(){
  location.replace("../dashboard/dashboard.html");
}