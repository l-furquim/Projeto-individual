var vezesClicadas = 0;



function abrirSobre() {
  containerModal.style.display = "block";
}

function fecharModal() {
  containerModal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == containerModal) {
    containerModal.style.display = "none";
  }
}

function mostrarPerfil() {
  const modal = modalUsuario;
  containerSeta.innerHTML = `
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5M8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6"/>
                              </svg>
                              `;
  
  if (vezesClicadas == 1) {
    vezesClicadas = 0;
    modal.style.display = "none";
    containerSeta.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"/>
                              </svg>`
  } else {
    vezesClicadas++;
    modal.style.display = "flex";
  }
}

