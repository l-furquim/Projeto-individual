async function cadastrar(){
  var nome = inputNome.value;
  var email = inputEmail.value;
  var senha = inputSenha.value;
  var confSenha = inputConfirmarSenha.value;

  const response = await fetch("http://localhost:3306/user/register", {
    id: 3,
    nome: nome,
    idade: 18
  });

  if(response){
    mensagem.innerHTML = response.body;
  }

}