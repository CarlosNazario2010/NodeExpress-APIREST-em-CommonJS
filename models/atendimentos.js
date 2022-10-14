// modulo responsavel pela comunicacao com o banco de dados

// permite enviar response no formato json
const { json } = require("express/lib/response");

// moment é uma lib que trabalha com datas
const moment = require("moment");

// importa a conexao do modulo infraestrutura
const conexao = require("../infraestrutura/conexao");

class Atendimento {
  // metodo que adiciona um atendimento
  adiciona(atendimento, res) {
    // instancia a data de criacao do atendimento
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");

    // instancia a data agendada para o atendimento
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );

    // pega todos os campos do atendimento (...) e adiciona a dataCriacao
    const atendimentoDatado = { ...atendimento, dataCriacao, data };

    // metodo sql em insere tudo que esta no objeto sql na tabela atendimento (?)
    const sql = "INSERT INTO atendimentos SET ?";

    // metodo query recebe a conexao, o atendimento e a tupla (erro, resultado) devolvendo um dos dois
    conexao.query(sql, atendimentoDatado, (erro, resultados) => {
      if (erro) {
        console.log(resultados);
        res.status(400).json(erro);
      } else {
        console.log(resultados);
        res.status(201).json(atendimento);
      }
    });
  }

  // metodo que lista todos os atendimentos cadastrados
  lista(res) {
    // metodo sql que seleciona toda (*) a tabela de atendimentos
    const sql = "SELECT * FROM atendimentos";

    // chama a query sql semelhante aos outros metodos
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  // metodo que busca um atendimento por id
  buscaPorId(id, res) {
    // metodo sql que seleciona por id
    const sql = `SELECT * FROM atendimentos WHERE id=${id}`;

    // novamente a query sql
    conexao.query(sql, (erro, resultados) => {
      const atendimento = resultados[0];

      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }

  // metodo que altera valores de uma atendimento
  altera(id, valores, res) {
    // se tiver uma data valida, a formata corretamente
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }

    // metodo sql que altera dados em uma tabela
    const sql = "UPDATE atendimentos SET ? WHERE id=?";

    // novamente a query sql
    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...valores, id });
      }
    });
  }

  // metodo que deleta um atendimento
  deleta(id, res) {
    // metodo sql que deleta um objeto da tabwla
    const sql = "DELETE FROM atendimentos WHERE id=?";

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

module.exports = new Atendimento();
