async function cadastrar(){
  var nome = inputNome.value;
  var email = inputEmail.value;
  var senha = inputSenha.value;
  var confSenha = inputConfirmarSenha.value;

  const resposta = await fetch("http://localhost:3333/maculados/cadastrar", {
    method: "POST",
    body: JSON.stringify({nome, email, senha, confSenha})
  });
  
}