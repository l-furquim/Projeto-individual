async function carregarDashboard() {
  const nomeUsuario = JSON.parse(sessionStorage.getItem("nome"));

  abaUsuario.innerHTML = nomeUsuario;  

  const parametros = new URLSearchParams(window.location.search);
  const idUsuario = parametros.get('id');

  console.log(idUsuario);

  if(idUsuario == undefined || idUsuario == null || nomeUsuario == null){
    location.replace("/login.html");
  }

  // abaUsuario.innerHTML = nome;
  // containerNome.innerHTML = nome;

  const dadosMaculado = await fetch(`/maculados/buscarDados/${idUsuario}`, {
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

      const nivel = (Number(primeiroParametro.contribuicoes) * 0.25).toFixed(0);
      
      spanNumeroNivel.innerHTML = nivel;

      // if(nivel >= 0 && nivel <= 10){
      //   containerRank.innerHTML = `<img style="" src="../assets/images/rankMaculado.JPG" width=200 height=200>`
      // }
      
      const tempoMinimo = Number(primeiroParametro.tempoMinimo);

      if(tempoMinimo > 0 && tempoMinimo < 60){
        spanMenorTempo.innerHTML = `${tempoMinimo} Minutos!`;
      }else if(tempoMinimo >= 60 && tempoMinimo < 1440){
        spanMenorTempo.innerHTML = `${(tempoMinimo / 60).toFixed(0)} Horas!`;
      }
      else if(tempoMinimo >= 1440){
        spanMenorTempo.innerHTML = `${((tempoMinimo / 60) / 24).toFixed(0)} Dias!`;
      }
      else if(tempoMinimo == 0){
        spanMenorTempo.innerHTML = "Ainda não registrado";
      }
      else if(tempoMinimo < 1){
        spanMenorTempo.innerHTML = `${(tempoMinimo * 60).toFixed(0)} Segundos!`;
      }

      
      

      spanPerguntasFechadas.innerHTML = primeiroParametro.contribuicoesFechadas;

      spanVotosAcumulados.innerHTML = primeiroParametro.votos;

      const dadosMeses = dados.respostaUm.map(d => d.mesContribuicao);
      const dadosContribuicoes = dados.respostaUm.map(d => d.qtdContribuicaoMes);

      const comentarios = dados.respostaTres.map(co =>  co.contribuicoesFechadasMes);
      const datasComentarios = dados.respostaTres.map(co => co.dataComentario);
    
      // const labelsMesesComentarios = dados.respostaTres.map(d => d.dtComentario);
      // const dadosComentarios = dados.respostaTres.map(d => d.contribuicoesFechadasMes);

      
      console.log(comentarios)

      const dadosGraficoContribuicoesMeses = dadosMeses.map((m, index) => ({
        mes: m,
        quantidadeContribuicoes: dadosContribuicoes[index]
      }));

      const dadosGraficoComentariosMeses = datasComentarios.map((c, index) => ({
        mes: c,
        quantidadeComentarios: comentarios[index]
      }));

      const labelsMeses = dadosGraficoContribuicoesMeses.map(d => d.mes); 
      const quantidadeContribuicoes = dadosGraficoContribuicoesMeses.map(d => d.quantidadeContribuicoes);

      const labelsMesesComentarios = dadosGraficoComentariosMeses.map(d => d.mes);
      const quantidadeComentarios = dadosGraficoComentariosMeses.map(d => d.quantidadeComentarios);


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
    
      new Chart(graficoPerguntasFechadasPorMeses, {
        type: 'line',
        data: {
          labels: labelsMesesComentarios,
          datasets: [{
            label: 'Comentarios',
            data: quantidadeComentarios,
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Histórico de Comentários que fecharam alguma contribuição',
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

  


  
  }