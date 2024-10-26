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