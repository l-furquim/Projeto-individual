function validarSessao(){
  var idUsuario = sessionStorage.getItem("id");

  


}

function validarRedirecionamento(idNav){
  var idUsuario = sessionStorage.getItem("id");

  if(idUsuario != null || idUsuario != undefined){
    var nav = document.getElementById(idNav);

    if(nav.id == "navInicio"){
      nav.innerHTML = `
      <a href="/inicio.html" class="selected">Início</a>
      <a href="/ranking.html">Ranking</a>
      <a href="/home.html">Home</a>
      <a id="ancoraDash">Dashboard</a>
      `
    }else if(nav.id == "navDashboard"){
      nav.innerHTML = `
      <a href="/inicio.html">Início</a>
      <a href="/ranking.html">Ranking</a>
      <a href="/home.html">Home</a>
      <a id="ancoraDash" class="selected">Dashboard</a>
      `
    }else{
      nav.innerHTML = `
                      <a href="/inicio.html">Início</a>
                      <a href="/ranking.html">Ranking</a>
                      <a href="/home.html" class="selected">Home</a>
                      <a id="ancoraDash">Dashboard</a>
                       `
    }
  }

   
}