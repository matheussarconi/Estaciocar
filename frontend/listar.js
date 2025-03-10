document.addEventListener("DOMContentLoaded", () => {
    listarGaragem();
});

async function listarGaragem() {
    const response = await fetch('http://localhost:3003/listarGaragem');
    const data = await response.json();
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';

    data.carro.forEach(carro => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${carro.dono}</td>
            <td>${carro.placa}</td>
            <td>${carro.cpf}</td>
            <td>${carro.vaga}</td>
            <td>
                <button id="remover" onclick="excluir('${carro.placa}')">Excluir</button>
            </td>
            <td>
               <button id="editar" onclick="abrirModal('${carro.dono}', '${carro.placa}', '${carro.cpf}', '${carro.vaga}', '${carro.placa}')">Editar</button>


            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função de exclusão chamada pelo onclick
async function excluir(placa) {
    const response = await fetch(`http://localhost:3003/remover/${placa}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    if (result.success) {
        alert('Carro removido com sucesso!');
        listarGaragem(); // Recarrega a lista após a exclusão
    } else {
        alert(result.message || 'Erro ao remover o carro!');
    }
}

// Função para abrir o modal e preencher os campos
function abrirModal(dono, placa, cpf, vaga, placaAntigaParam) {
    placaAntiga = placaAntigaParam; 
    document.getElementById('nome').value = dono;
    document.getElementById('placa').value = placa;
    document.getElementById('cpf').value = cpf;
    document.getElementById('vaga').value = vaga;

    // Exibir o modal
    document.getElementById('modal').style.display = 'block';

    
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

// Função para editar os dados do carro
async function editarCarro() {
    const dono = document.getElementById('nome').value;
    const placaNova = document.getElementById('placa').value;
    const cpf = document.getElementById('cpf').value;
    const vaga = document.getElementById('vaga').value;

    console.log('Dados enviados:', { dono, placa, cpf, vaga });

    const response = await fetch(`http://localhost:3003/editar/${placaAntiga}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({placaAntiga, dono, placaNova, cpf, vaga })
    });

    const result = await response.json();
    if (result.success) {
        alert('Carro editado com sucesso!');
        listarGaragem(); // Recarrega a lista após a edição
        fecharModal(); // Fecha o modal
    } else {
        alert(result.message || 'Erro ao editar o carro!');
    }
}