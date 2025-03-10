document.addEventListener("DOMContentLoaded", () => {
  listarVagas()
});
async function cadastrar(event) {
  event.preventDefault();

  const placa = document.getElementById('placa').value;
  const dono = document.getElementById('dono').value;
  const cpf = document.getElementById('cpf').value;
  const vaga = document.getElementById('vaga').value;

  console.log(dono, cpf, placa, vaga);

  // Envia a requisição para o backend verificar se a vaga está ocupada
  const response = await fetch('http://localhost:3003/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placa, dono, cpf, vaga })
  });

  const result = await response.json();

  if (result.success) {
      alert("Cadastro feito com sucesso");
      // window.location.href = "./";
  } else {
      alert(result.message || "Houve um erro ao cadastrar");
  }
  
  listarVagas()

}

async function listarVagas() {
  const response = await fetch('http://localhost:3003/listarVagas');
  const data = await response.json();
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = ''; // Limpa a tabela antes de inserir novos dados
  console.log(data); // Debug: Veja como a API está respondendo

  data.vaga.forEach(vaga => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${vaga.vaga}</td>

    `;
    tbody.appendChild(row);
  });
}

async function irParaLista(event){
  event.preventDefault()

  window.location.href = "./lista.html";
}
