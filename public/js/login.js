document.querySelector('#inputSenha').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    logar();
  }
});
document.querySelector('#inputEmail').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    logar();
  }
});

async function logar(){
  const emailVar  = inputEmail.value;
  const senhaVar = inputSenha.value;
  var resposta = "";
  var icone = "";

  botaoLogar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                              </svg>`

  console.log(emailVar, senhaVar);

  const corpo = JSON.stringify({
    email: emailVar,
    senha: senhaVar
  })
  const response = await fetch("/maculados/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: corpo
  });

  if(response.status == 201){
    response.json().then((data)=> {

      sessionStorage.setItem("id",JSON.stringify(data[0].idMaculado));
      sessionStorage.setItem("nome",JSON.stringify(data[0].nome));
      sessionStorage.setItem("email",JSON.stringify(data[0].email));
      sessionStorage.setItem("contribuicoes",JSON.stringify(data[0].contribuicoes));
      sessionStorage.setItem("maculadosAjudados",JSON.stringify(data[0].maculadosAjudados));
    })

    resposta = "Login realizado com sucesso... redirecionando para o mural";
    icone = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
            </svg>`;
    /* sessionStorage.NOME_MACULADO =  */

    setTimeout(()=> {
      divMensagem.innerHTML = resposta;
      botaoLogar.innerHTML = icone;
  
       setTimeout(()=> {
        location.replace("/mural.html");
      }, 1000); 
    }, 2000);

    
  }else{
   response.json().then(m => {
      resposta = m.mensagem;
      icone = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>`
      divMensagem.style.border = "solid 1px #600404;";

      setTimeout(()=> {
        divMensagem.innerHTML = resposta;
        botaoLogar.innerHTML = icone;
      }, 2000);
    });
  }

}