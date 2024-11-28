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
      <a href="/mural.html">Mural</a>
      <a href="/dashboard.html?id=${idUsuario}" id="ancoraDash">Dashboard</a>
      `
    }else if(nav.id == "navDashboard"){
      nav.innerHTML = `
      <a href="/inicio.html">Início</a>
      <a href="/ranking.html">Ranking</a>
      <a href="/mural.html">Mural</a>
      <a /dashboard.html?id=${idUsuario} id="ancoraDash" class="selected">Dashboard</a>
      `
    }else{
      nav.innerHTML = `
                      <a href="/inicio.html">Início</a>
                      <a href="/ranking.html">Ranking</a>
                      <a href="/mural.html" class="selected">Mural</a>
                      <a /dashboard.html?id=${idUsuario} id="ancoraDash">Dashboard</a>
                       `
    }
  }

   
}