async function logar(event){
    event.preventDefault();

    const cpf = document.getElementById('cpf').value
    const senha = document.getElementById('senha').value

    console.log(cpf, senha);
    

    const response = await fetch('http://localhost:3003/logar',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({cpf, senha})

    })
    const result= await response.json();

    if (result.success) {
      alert("Login feito com sucesso");
      window.location.href = "../frontend/cadastroCarros.html";



  } else {
      alert(result.message || "Houve um erro ao logar");
  }
}

