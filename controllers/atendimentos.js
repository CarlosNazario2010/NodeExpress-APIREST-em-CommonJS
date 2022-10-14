// modulo responsavel por tratar os requisicoes HTTP do client

// importa o express
const express = require("express");

// importa a classe Atendimento do modulo atendimentos
const Atendimento = require("../models/atendimentos");

// exporta a arrow function app
module.exports = (app) => {
  //use informa o formato do arquivo enviado
  app.use(express.json());

  // get envia dados para o client
  app.get("/atendimentos", (req, res) => {
    Atendimento.lista(res);
  });

  app.get("/atendimentos/:id", (req, res) => {
    // converte o id da requisicao para inteiro para que possa ser trabalhado pelo banco sql
    const id = parseInt(req.params.id);

    Atendimento.buscaPorId(id, res);
  });

  // post envia dados do cliente para o servidor
  app.post("/atendimentos", (req, res) => {
    // req.body pega o corpo da requisicao (o que foi digitado no client)
    const atendimento = req.body;

    Atendimento.adiciona(atendimento, res);

    console.log(atendimento);
  });

  // patch altera os dados de um atendimento. OBS - o patch altera alguns dados do objeto. O put altera todos os campos do objeto, entao, mesmo com dados iguais, todos os campos devem ser preenchidos
  app.patch("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    Atendimento.altera(id, valores, res);
  });

  // delete apaga um atendimento
  app.delete("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.deleta(id, res);
  });
};

// Sera usado o postman, que ira simular as requisicoes solicitadas pelo cliente
