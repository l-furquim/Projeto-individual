async function logar(){
  const emailVar  = inputEmail.value;
  const senhaVar = inputSenha.vaue;
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
  
  response.json().then((r)=> {
    console.log(r.mensagem)
  });

}