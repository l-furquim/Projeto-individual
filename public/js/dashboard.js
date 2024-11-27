async function carregarDashboard() {
  const nomeUsuario = JSON.parse(sessionStorage.getItem("nome"));
  let dadosContribuicoes = [0,0,0,0,0,0,0,0,0,0,0,0];
  

  abaUsuario.innerHTML = nomeUsuario;  

  const parametros = new URLSearchParams(window.location.search);
  const idUsuario = parametros.get('id');

  console.log(idUsuario);

  if(idUsuario == undefined || idUsuario == null || nomeUsuario == null){
    location.replace("/login.html");
  }

  const dadosMaculado = await fetch(`/maculados/buscarDados/${idUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if(dadosMaculado.ok){

      if(dadosMaculado.status == 204){
        spanContribuicoesTotais.innerHTML = 0;
        spanNumeroNivel.innerHTML = 0;
        spanMenorTempo.innerHTML = "Ainda não registrado";
        spanPerguntasFechadas.innerHTML = 0;
        spanVotosAcumulados.innerHTML = 0;
        conteudoBrasao.innerHTML += "Sem liga";
      }else{

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

      if(primeiroParametro.contribuicoes >= 1 &&  primeiroParametro.contribuicoes <= 10){
        conteudoBrasao.innerHTML += '<img src="./assets/images/brasaoMaculado.png" alt="" width="100" height="100"> <p>Maculado</p>'; 
      }else if(primeiroParametro.contribuicoes > 10 &&  primeiroParametro.contribuicoes <= 20){
        conteudoBrasao.innerHTML += '<img src="./assets/images/brasaoLord.png" alt="" width="100" height="100">  <p>Lord</p>';
      }else if(primeiroParametro.contribuicoes > 20 &&  primeiroParametro.contribuicoes <= 30){
        conteudoBrasao.innerHTML += '<img src="./assets/images/brasaoSemiDeus.png" alt="" width="100" height="100"> <p>Semi Deus</p>';
      }else{
        conteudoBrasao.innerHTML += "Sem liga no momento";
      }
      spanNumeroNivel.innerHTML = nivel;
      
      const tempoMinimo = Number(primeiroParametro.tempoMinimo);

      if(tempoMinimo > 0 && tempoMinimo < 60){
        spanMenorTempo.innerHTML = `${tempoMinimo} Segundos!`;
      }else if(tempoMinimo >= 60 && tempoMinimo < 3600){
        spanMenorTempo.innerHTML = `${(tempoMinimo / 60).toFixed(0)} Minutos!`;
      }
      else if(tempoMinimo >= 3600 && tempoMinimo < 86400){
        spanMenorTempo.innerHTML = `${(tempoMinimo / 3600).toFixed(0)} Horas!`;
      }else if(tempoMinimo >= 86400){
        spanMenorTempo.innerHTML = `${((tempoMinimo / 3600) / 24).toFixed(0)} Dias!`;
      }else if(tempoMinimo == 0){
        spanMenorTempo.innerHTML = "Ainda não registrado";
      }else if(tempoMinimo < 1){
        spanMenorTempo.innerHTML = `${(tempoMinimo * 60).toFixed(0)} Segundos!`;
      }
      

      spanPerguntasFechadas.innerHTML = primeiroParametro.contribuicoesFechadas;

      spanVotosAcumulados.innerHTML = primeiroParametro.votos;

      dados.respostaUm.forEach(d => {
        dadosContribuicoes[Number(d.mesContribuicao.substr(5,6)) -1] = d.qtdContribuicaoMes
      });
2
      const comentarios = dados.respostaTres.map(co =>  co.contribuicoesFechadasMes);
      const datasComentarios = dados.respostaTres.map(co => co.dataComentario);      
      console.log(comentarios)

      const dadosGraficoComentariosMeses = datasComentarios.map((c, index) => ({
        mes: c,
        quantidadeComentarios: comentarios[index]
      }));

      const labelsMesesComentarios = dadosGraficoComentariosMeses.map(d => d.mes);
      const quantidadeComentarios = dadosGraficoComentariosMeses.map(d => d.quantidadeComentarios);

      console.log(dados.respostaUm[0].mesContribuicao.substr(5,6));
      
      const labelsContribuicoes = dados.respostaDois.map((contribuicao) => contribuicao.titulo);
      const quantidadeVotos = dados.respostaDois.map((contribuicao) => contribuicao.totalVotos);

      new Chart(graficoContribuicoesTotaisPorMeses, {
        type: 'bar',
        data: {
          labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
          datasets: [{
            label: 'Contribuições',
            data: dadosContribuicoes,
            borderWidth: 1,
            color: "#FFFF"
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Histórico de contribuições do ano atual.',
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

  


  
  }