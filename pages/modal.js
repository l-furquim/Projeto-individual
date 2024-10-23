function abrirSobre () {
  containerModal.style.display = "block";
}

function fecharModal(){
  containerModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == containerModal) {
      containerModal.style.display = "none";
  }
}

