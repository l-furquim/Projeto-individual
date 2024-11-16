async function carregarDashboard() {
  const id = JSON.parse(sessionStorage.getItem("id"));
  const nomeUsuario = JSON.parse(sessionStorage.getItem("nome"));


  abaUsuario.innerHTML = nomeUsuario;  

  const parametros = new URLSearchParams(window.location.search);
  const idUsuario = parametros.get('id');

  console.log(idUsuario)

  // abaUsuario.innerHTML = nome;
  // containerNome.innerHTML = nome;

  const dadosMaculado = await fetch(`http://localhost:3333/maculados/buscarDados/${idUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if(dadosMaculado.ok){
    const dados = await dadosMaculado.json();
      
      console.log(dados);
    
      containerNome.innerHTML = dados.respostaUm[0].nome;
      
      spanContribuicoesTotais.innerHTML = dados.respostaUm[0].contribuicoes;

      spanNumeroNivel.innerHTML =  (Number(dados.respostaUm[0].contribuicoes) * 0.25).toFixed(0);
      
      spanPerguntasFechadas.innerHTML = dados.respostaUm[0].contribuicoesFechadas;
      spanMenorTempo.innerHTML = "12";
      spanVotosAcumulados.innerHTML = dados.respostaUm[0].votos;

      const dadosMeses = dados.respostaUm.map(d => d.mesContribuicao);
      const dadosContribuicoes = dados.respostaUm.map(d => d.qtdContribuicaoMes);
      
      const dadosGraficoContribuicoesMeses = dadosMeses.map((m, index) => ({
        mes: m,
        quantidadeContribuicoes: dadosContribuicoes[index]
      }));

      const labelsMeses = dadosGraficoContribuicoesMeses.map(d => d.mes); 
      const quantidadeContribuicoes = dadosGraficoContribuicoesMeses.map(d => d.quantidadeContribuicoes);

      const labelsContribuicoes = dados.respostaDois.map((contribuicao) => contribuicao.titulo);
      const quantidadeVotos = dados.respostaDois.map((contribuicao) => contribuicao.totalVotos);


      console.log(labelsMeses, quantidadeContribuicoes);

      new Chart(graficoContribuicoesTotaisPorMeses, {
        type: 'line',
        data: {
          labels: labelsMeses,
          datasets: [{
            label: 'Contribuições',
            data: quantidadeContribuicoes,
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Histórico de contribuições',
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

      new Chart(graficoContribuicoesMaisVotadas, {
        type: 'bar',
        data: {
          labels: labelsContribuicoes,
          datasets: [{
            label: 'Votos',
            data: quantidadeVotos,
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Contribuições mais votadas',
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

    }

  

  new Chart(graficoPerguntasFechadasPorMeses, {
    type: 'bar',
    data: {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
      datasets: [{
        label: 'Temperatura média',
        data: [22, 24, 27, 23, 20, 18],
        borderWidth: 1
      }, {
        label: 'Umidade média',
        data: [90, 89, 93, 87, 88, 82],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Vezes jogadas',
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

 
  new Chart(graficoComentariosPorMeses, {
    type: 'pie',
    data: {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril","Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      datasets: [{
        label: 'Acertos',
        data: [2, 3, 5, 10, 15, 10, 5, 19, 20, 30],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Acertos nos ultimos 10 dias',
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
  }