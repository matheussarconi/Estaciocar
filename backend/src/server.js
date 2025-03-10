const express = require('express');
const cors = require('cors');
const connection = require('./db_config');
const app = express();

app.use(cors());
app.use(express.json());

const port = 3003;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

// Logar usuários
app.post('/logar', (req, res) => {
    const { cpf, senha } = req.body;
  
    const query = 'SELECT * FROM usuario WHERE cpf = ? AND senha = ?';
    connection.query(query, [cpf, senha], (err, result) => {
      if (err) {
        return result.status(500).json({ success: false, message: 'Erro no servidor.' });
      }
  
      if (result.length > 0) {
        res.json({ success: true, message: 'Login bem-sucedido!' });
      } else {
        res.json({ success: false, message: 'Usuário ou senha incorretos!' });
      }
    });
});

// Cadastrar usuários
app.post('/cadastrarUsuario', (req, res)=>{
  const{cpf, nome, senha}= req.body;
  connection.query(query, [cpf, nome, senha],(err,results) =>{
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Cadastro bem-sucedido!' });
    } else {
      res.json({ success: false, message: 'Cadastro ou senha incorretos!' });
    }
  });
})

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

//Mostra as vagas disponíveis
app.get('/listarVagas', (req, res) => {
  const query = 'SELECT vaga FROM carros';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro ao buscar carros na garagem.' });
    }
    res.json({ success: true, vaga: results });
  });
});

app.get('/listarGaragem', (req, res) => {
    const query = 'SELECT * FROM carros';
    connection.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao buscar carros na garagem.' });
      }
      res.json({ success: true, carro: results });
    });
  });


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

