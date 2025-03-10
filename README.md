# Estaciocar

<h2>Informações do trabalho</h2>
<li>Banco de dados</li>
<li>Rota de Login</li>
<li>Rota de Cadastro de usuario</li>
<li>Rota de Cadastro de produtos</li>



<h2>Criando o banco de dados</h2>

<h3>Criando a databse</h3>

````
create database estaciocar;
````
<h3>Selecionar a database</h3>

````
use estaciocar;
````

<h3>Criar a tabela de carros</h3>

````
create table carros(
    placa int not null primary key unique,
    dono varchar(500) not null,
    cpf varchar(500) not null unique,
    vaga enum("Gestante", "Idoso","Deficiente", "Vaga1", "Vaga2", "Vaga3","Vaga4","Vaga5", "Vaga6", "Vaga7") not null default("comum")
);
 
````
<h3>Criar a tabela de usuarios</h3>

````
create table usuario(
    cpf varchar(11) primary key unique
    nome varchar(200) 
    senha varchar(100) 
); 

````
<h3>Para ver se tem algo dentro das tabelas</h3>

````
select * from carros;
````
<h2>Criando a API</h2>

<h3>Abrir o gitbash e usar a pasta no terminal</h3>

````
cd estaciocar
````
<h3>Criar o arquivo package.json para gerenciaros pacotes node</h3>

````
npm init -y
````
<h3>Instalar os 4 pacotes necessários para o uso das api`s</h3>

````
npm i express nodemon mysql2 cors
````

O que cada pacote faz:
<li>express: framework web para construção da infraestrutura da API;</li>
<li>nodemon: Monitora as mudanças nos arquivos do projeto e reinicia automaticamente o servidor do Node;</li>
<li>mysql2: Conectar e mandar comandos SQL para o banco;</li>
<li>cors: Mecanismo para adicionar cabeçalhos HTTP que informam aos navegadores para permitir que uma aplicação web seja executada em origem e acesse recursos de outra origem diferente</li>




<h2>Abrir o arquivo no VSCODE</h2>

````
code . 
````
<h3>Agora criar uma pasta dentro do VSCODE com o nome SRC</h3>

<h3>Dentro do SRC, vai criar um file com o nome de dp_config.js </h3>
<h3>Dentro do dp_config.js:</h3>

<li>linkar o mysql com o VSCODE</li>

````
const mysql = require('mysql2')

const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'estaciocar'

});

connection.connect((err) => {
    if(err){
        throw err;
    } else{
        console.log('Mysql conectado');
    }
})

module.exports = connection;
````
<h3>Agora criar um file dentro do SRC com o nome server.js</h3>

<h3>Dentro do server.js sera feito as nossas rotas, mas antes, vamos criar as portas:</h3>

<li>Definir a porta</li>

````
const express = require('express');
const cors = require('cors');
````
<li>Habilitar o cors e utilizar o json</li>

````
const porta = 3002;
const app = express();
````

<li>Fazer uma conexão com o file criado anteriormente, o dp_config.js</li>

````
const connection = require('./dp_config');
````

<h3>Paginas</h3>
<ul>
<li>Pagina de cadastro de carros</li>
  
  ````
  
    <form class="form" id="formCadastro">
      
      <input type="text" id="dono" placeholder="Nome do dono" required>

      <input type="number" id="cpf" placeholder="Cpf do dono" required>

      <input type="text" id="placa" placeholder="Placa do veículo" required>

      <label for="vaga" id="frase_vaga">Escolha uma vaga:</label>
      <select id="vaga">
        <option value="Deficiente">Deficeinte</option>
        <option value="Idoso">Idoso</option>
        <option value="Gestante">Gestante</option>
        <option value="Vaga1">Vaga 1</option>
        <option value="Vaga2">Vaga 2</option>
        <option value="Vaga3">Vaga 3</option>
        <option value="Vaga4">Vaga 4</option>
        <option value="Vaga5">Vaga 5</option>
        <option value="Vaga6">Vaga 6</option>
        <option value="Vaga7">Vaga 7</option>
      </select>


      <div class="botoes">
        <button type="submit" class="cadastrar" onclick="cadastrar(event)">Cadastrar</button>
        <button class="cadastrar" onclick="irParaLista(event)">Ver a lista dos carros</button>
        <!-- <a class="ancora" href="../frontend/lista.html">Ver a lista dos carros</a> -->
      </div>
    </form>
    <table class="tabelaVagas">
      <thead>
        <tr>
          <th>Vagas Ocupadas</th>
        </tr>
      </thead>
      <tbody id="tbody">
        <tr>
          <!-- aqui dentro tem os dados dos carros estacionados na garagem -->
        </tr>
      </tbody>
    </table>
````
  
<li>Pagina de listar os carros</li>

```

       <table class="tabelaCarros">
            <thead>
              <tr>
                <th>Dono</th>
                <th>Placa</th>
                <th>CPF</th>
                <th>Vaga</th>
                <th>Sair</th>
                <th>Alterar dados</th>
              </tr>
            </thead>
            <tbody id="tbody">
              <tr>
                <!-- aqui dentro tem os dados dos carros estacionados na garagem -->
              </tr>
            </tbody>
        </table>
    </main>

    <!-- Modal para edição -->
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="fecharModal()">&times;</span>
            <h2>Editar Carro</h2>
            <label for="nome">Dono:</label>
            <input type="text" id="nome" required>
            <label for="placa">Placa:</label>
            <input type="text" id="placa" required>
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" required>
            <label for="vaga" id="frase_vaga">Escolha uma vaga:</label>
            <select id="vaga">
              <option value="Deficiente">Deficeinte</option>
              <option value="Idoso">Idoso</option>
              <option value="Gestante">Gestante</option>
              <option value="Vaga1">Vaga 1</option>
              <option value="Vaga2">Vaga 2</option>
              <option value="Vaga3">Vaga 3</option>
              <option value="Vaga4">Vaga 4</option>
              <option value="Vaga5">Vaga 5</option>
              <option value="Vaga6">Vaga 6</option>
              <option value="Vaga7">Vaga 7</option>
            </select>
            <button onclick="editarCarro()">Salvar</button>
        </div>
    </div>

    <script src="./listar.js"></script>
```

<li>Pagina de login</li>

```
  <form>
    <h1 id="titulo">Login</h1>
    <form>
      <!-- <label for="email">Cpf:</label> -->
      <input type="text" id="cpf" placeholder="CPF" required>

      <input type="password" id="senha" placeholder="Senha" required>
      <button type="submit" class="logar" onclick="logar(event)">Entrar</button>
    </form>
    <p id="texto">Ainda não possui conta? cadastre-se <a href="./cadastroUsuario.html">aqui</a></p> 
  </form>

  <script src="./logar.js"></script>

```

</ul>

<h2>Agora, será feita o JS das páginas</h2>

<ul>
  <li>Js do cadastro de veículos</li>
  
  ```
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
  
```

<li>JS da página de listar os carros</li>

```
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
```
<li>JS da página de login</li>

```
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
```
  
</ul>


<li>Agora, sera feito a primeira rota, a rota de cadastro, pra ela sera usado o post, pois ele server para adicionar o carro no banco de dados e verificar se a vaga já está ocupada ou não.</li>


````
app.post('/cadastrar', (req, res) => {
  const { placa, dono, cpf, vaga } = req.body;

  // Verificar se a vaga já está ocupada
  connection.query('SELECT * FROM carros WHERE vaga = ?', [vaga], (err, results) => {

      if (results && results.length > 0) {
          // Vaga já ocupada
          return res.status(400).json({ success: false, message: 'Vaga já ocupada' });
      }

      // Se a vaga não estiver ocupada, insere o novo cadastro
      const query = 'INSERT INTO carros (placa, dono, cpf, vaga) VALUES(?,?,?,?)';
      connection.query(query, [placa, dono, cpf, vaga], (err, results) => {
          if (err) {
              console.error('Erro ao cadastrar carro:', err);
              return res.status(500).json({ success: false, message: 'Erro ao cadastrar carro.' });
          }

          // Cadastro realizado com sucesso
          res.json({ success: true, message: 'Cadastro realizado com sucesso' });
      });
  });
});
````
<li>Agora é a rota de listar, onde o get puxa as vagas já ocupadas dentro do banco de dados e as listas na tabela dentro da página de cadastro dos carros</li>

````
app.post('/logar/usuario', (req, res) => {
    console.log('Dados recebidos:', req.body);

    let params = [req.body.email];
    let query = "SELECT id_usuario, nomeUsuario, senha, perfil FROM usuario WHERE email = ?";
    
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro na consulta ao banco de dados:', err);
            return res.status(500).json({
                success: false,
                message: "Erro no servidor"
            });
        }

        if (results.length > 0) {
            let senhaDigitada = req.body.senha;
            let senhaBanco = results[0].senha;

            if (senhaBanco === senhaDigitada) {
                res.status(200).json({
                    success: true,
                    message: "Sucesso",
                    data: results[0]
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Senha não cadastrada"
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: "Email não cadastrado"
            });
        }
    });
});
````
<li>Uma rota para listar todos os itens dentro da tabela de carros do banco de dados</li>

````
app.get('/listarGaragem', (req, res) => {
    const query = 'SELECT * FROM carros';
    connection.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao buscar carros na garagem.' });
      }
      res.json({ success: true, carro: results });
    });
  });

````
<li>Uma rota para deletar o carro selecionado de dentro do banco de dados</li>

````
 app.delete('/remover/:placa', (req, res) => {
    const {placa } = req.params;
    const query = 'DELETE FROM carros WHERE placa = ?';
    connection.query(query, [placa], (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao remover carro.' });
      }
      res.json({ success: true, message: 'Carro removido com sucesso!' });
    });
  });


````
<li>Uma rota para editar os valores do carro selecionado</li>

````

  app.put('/editar/:placa', (req, res) => {
    const placaAntiga = req.params.placa;
    const { dono, placaNova, cpf, vaga } = req.body;

    console.log('Recebendo requisição para editar:', { placaAntiga, dono, placaNova, cpf, vaga });

    const query = 'UPDATE carros SET placa=?, dono=?, cpf=?, vaga=? WHERE placa=?';
    connection.query(query, [placaNova, dono, cpf, vaga, placaAntiga], (err) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            return res.status(500).json({ success: false, message: 'Erro ao atualizar carro.' });
        }
        res.json({ success: true, message: 'Carro atualizado com sucesso!' });
    });
});


````

