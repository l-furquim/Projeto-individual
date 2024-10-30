async function cadastrar(){
  var nome = inputNome.value;
  var email = inputEmail.value;
  var senha = inputSenha.value;
  var confSenha = inputConfirmarSenha.value;
  var resposta = "";
  const corpo =  JSON.stringify({
    nome: nome, 
    email: email, 
    senha: senha
  });

  const response  = await fetch("/maculados/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: corpo
  });

  if(response.ok){
    resposta = "Cadastro realizado com sucesso !";
  }else{
   response.json().then(m => {
      resposta = m.mensagem;
    });
  }
  setTimeout(()=> {
  }, 1000)  
  botaoCadastrar.innerHTML = resposta


  console.log(resposta);
}