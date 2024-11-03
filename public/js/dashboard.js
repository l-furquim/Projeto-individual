async function carregarDashboard() {
  const nome = JSON.parse(sessionStorage.getItem("nome"));

  abaUsuario.innerHTML = nome;
  containerNome.innerHTML = nome;

  new Chart(graficoContribuicoesTotaisPorMeses, {
    type: 'line',
    data: {
      labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
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

  new Chart(graficoContribuicoesMaisVotadas, {
    type: 'line',
    data: {
      labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
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
  new Chart(graficoComentariosPorMeses, {
    type: 'line',
    data: {
      labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
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
