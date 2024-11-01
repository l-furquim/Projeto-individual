async function cadastrar(){
  
  const nome = inputNome.value;
  const email = inputEmail.value;
  const senha = inputSenha.value;
  const confSenha = inputConfirmarSenha.value;
  
  var resposta = "";
  var icone = "";
  var cadastroValido = true;
  var possuiNumero = false;

  erroNome.innerHTML = "";
  erroEmail.innerHTML = "";
  erroSenha.innerHTML = "";
  
  if(nome.length < 1){
    erroNome.innerHTML = "Nome invalido, deve conter no mínimo 1 caractere.";
    cadastroValido = false;
    erroNome.style.border = "solid 1px #600404";
  }
  if(email.length < 1){
    erroEmail.innerHTML = "Email invalido, deve conter no mínimo 1 caractere";
    cadastroValido = false;
    erroEmail.style.border = "solid 1px #600404";
  }
  if(!email.includes("@") || !email.endsWith(".com")){
    erroEmail.innerHTML = "Email invalido"
    cadastroValido = false;
    erroEmail.style.border = "solid 1px #600404";
  }
  
  for(let i =0; i <= senha.length; i++){
    if(senha[i] >= "0" && senha[i] <="9"){
        possuiNumero = true;
    }
  }

  if(
    senha.length < 5 || senha.toLowerCase == senha || !possuiNumero
  ){
    erroSenha.innerHTML = "Senha inválida, deve conter no mínimo 5 caracteres , sendo um deles especial, outro maisculo e outro numérico.";
    cadastroValido = false;
    erroSenha.style.border = "solid 1px #600404";
  }else if(senha != confSenha){
    erroSenha.innerHTML = "As senhas não conhecidem..";
    erroSenha.style.border = "solid 1px #600404";
  }

  if(cadastroValido){
    erroNome.style.border = "none";
    erroEmail.style.border = "none";
    erroSenha.style.border = "none";
    var estilo = "";
    
    const corpo =  JSON.stringify({
      nome: nome, 
      email: email, 
      senha: senha
    });
  
    botaoCadastrar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
          </svg>`
  
    const response  = await fetch("/maculados/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: corpo
    });
  
    if(response.ok){
      resposta = "Cadastro realizado com sucesso!";
      icone = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
              </svg>`;
      estilo = "solid 1px #044e049c";
    }else{
     response.json().then(m => {
        resposta = m.mensagem;
        icone = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>`
                
        estilo = "solid 1px #600404";
      });
    }
  
    setTimeout(()=> {
      erroSenha.innerHTML = resposta; // Nunca mais fazer isso...
      botaoCadastrar.innerHTML = icone;
      erroSenha.style.border = estilo;

      if(resposta == "Cadastro realizado com sucesso!"){
        setTimeout(()=> {
          divMensagem.innerHTML += "<br> redirecionando para a pagina de login..."
            location.replace("/login.html")
        }, 1000)
      }

    }, 2000);

    console.log(resposta);
  }
}