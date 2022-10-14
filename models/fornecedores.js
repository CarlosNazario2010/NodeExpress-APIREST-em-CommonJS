// modulo responsavel pela comunicacao com o banco de dados

// permite enviar response no formato json
const { json } = require("express/lib/response");

// moment é uma lib que trabalha com datas
const moment = require("moment");
const fornecedores = require("../controllers/fornecedores");

// importa a conexao do modulo infraestrutura
const conexao = require("../infraestrutura/conexao");

class Fornecedores {
  // metodo que adiciona um fornecedor
  adiciona(fornecedores, res) {
    // instancia a data de criacao do fornecedor
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");

    // instancia a data agendada para o fornecedor
    const data = moment(fornecedores.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );

    // pega todos os campos do fornecedor (...) e adiciona a dataCriacao
    const fornecedoresDatado = { ...fornecedores, dataCriacao, data };

    // metodo sql em insere tudo que esta no objeto sql na tabela fornecedore (?)
    const sql = "INSERT INTO fornecedores SET ?";

    // metodo query recebe a conexao, o fornecedor e a tupla (erro, resultado) devolvendo um dos dois
    conexao.query(sql, fornecedoresDatado, (erro, resultados) => {
      if (erro) {
        console.log(resultados);
        res.status(400).json(erro);
      } else {
        console.log(resultados);
        res.status(201).json(fornecedores);
      }
    });
  }

  // metodo que lista todos os fornecedores cadastrados
  lista(res) {
    // metodo sql que seleciona toda (*) a tabela de fornecedores
    const sql = "SELECT * FROM fornecedores";

    // chama a query sql semelhante aos outros metodos
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  // metodo que busca um fornecedor por id
  buscaPorId(id, res) {
    // metodo sql que seleciona por id
    const sql = `SELECT * FROM fornecedores WHERE id=${id}`;

    // novamente a query sql
    conexao.query(sql, (erro, resultados) => {
      // o indice 0 serve para retornar o objeto fora do array
      const fornecedores = resultados[0];

      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(fornecedores);
      }
    });
  }

  // metodo que altera valores de um fornecedores
  altera(id, valores, res) {
    // se tiver uma data valida, a formata corretamente
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }

    // metodo sql que altera dados em uma tabela
    const sql = "UPDATE fornecedores SET ? WHERE id=?";

    // novamente a query sql
    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...valores, id });
      }
    });
  }

  // metodo que deleta um fornecedor
  deleta(id, res) {
    // metodo sql que deleta um objeto da tabwla
    const sql = "DELETE FROM fornecedores WHERE id=?";

    // novamente a query sql
    conexao.query(sql, id, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Fornecedores();
