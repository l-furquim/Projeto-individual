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
    
      const primeiroParametro = dados.respostaUm[0];

      containerNome.innerHTML = primeiroParametro.nome;
      
      spanContribuicoesTotais.innerHTML = primeiroParametro.contribuicoes;


        const porcentagem = (primeiroParametro.contribuicoes / 4) * 100;
        const circuloPorcentagem = document.querySelector('.progresso-circulo');
        const texto = document.getElementById('porcentagemXp');
        
        const raio = 50;
        const circunferencia = 2 * Math.PI * raio;
        const offset = circunferencia - (porcentagem / 100) * circunferencia;
        
        circuloPorcentagem.style.strokeDashoffset = offset;
        
        texto.innerHTML = `${porcentagem / 100}  XP`;

      
      spanNumeroNivel.innerHTML =  (Number(primeiroParametro.contribuicoes) * 0.25).toFixed(0);
      
      const tempoMinimo = Number(primeiroParametro.tempoMinimo);

      if(tempoMinimo > 60){
        spanMenorTempo.innerHTML = `${(tempoMinimo / 60).toFixed(0)} Minutos!`;
      }

      spanPerguntasFechadas.innerHTML = primeiroParametro.contribuicoesFechadas;

      spanVotosAcumulados.innerHTML = primeiroParametro.votos;

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

      new Chart(graficoEngajamentoPorTipo, {
        type: 'pie',
        data: {
          labels: ["celebrar", "dica", "ajuda"],
          datasets: [{
            label: 'Votos',
            data: [dados.respostaUm[0].votosCelebrar,dados.respostaUm[0].votosDica, dados.respostaUm[0].votosAjuda ],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Engajamento por tipo de contribuição feita',
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

 
  
  }