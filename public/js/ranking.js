var graficoClasse = null;



async function buscarDadosRanking(){
  const idGrafico = document.getElementById("graficoRankings").getContext("2d");
  const topUsuariosId = [];

    
  abaUsuario.innerHTML = JSON.parse(sessionStorage.getItem("nome"));
  const idUsuario = JSON.parse(sessionStorage.getItem("id"));
  ancoraDash.href = `./dashboard.html?id=${idUsuario}`;

  try{
      const resposta = await fetch("/maculados/ranking/buscar", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const parse = await resposta.json();

      console.log(parse)

      const nomes = parse.map((r) => r.nome);
      const votos = parse.map((r) => r.votosAcumulados);
      const ids = parse.map((r) => r.idMaculado);
      
      topUsuariosId.push(ids[1], ids[0], ids[2]);

      graficoClasse = new Chart(idGrafico, {
        type: 'bar',
        data: {
          labels: [nomes[1], nomes[0], nomes[2]],
          datasets: [{
            label: 'Voto',
            data: [votos[1], votos[0], votos[2]],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              color: '#e7c274',
              font: {
                size: 24,
                weight: 'bold',
              },
              padding: {
                top: 10,
                bottom: 30
              },
              align: 'center'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#e7c274'
              }
            },
            x: {
              ticks: {
                color: '#e7c274'
              }
            }
          }
        }
      });

  }catch(erro){
    console.log(erro)
    throw erro;
  }

  const grafico = document.getElementById("graficoRankings");

  grafico.addEventListener("click", function (e) {
    const labels = graficoClasse.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
    
    if (labels.length) {
      const firstPoint = labels[0];
      const label = graficoClasse.data.labels[firstPoint.index];
      console.log(label);

      const idUsuario = topUsuariosId[firstPoint.index];

      location.replace(`/dashboard.html?id=${idUsuario}`);


    }
  });


}