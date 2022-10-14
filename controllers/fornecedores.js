// modulo responsavel por tratar os requisicoes HTTP do client

// importa o express
const express = require("express");

// importa a classe Fornecedores do modulo atendimentos
const Fornecedores = require("../models/fornecedores");

// exporta a arrow function app
module.exports = (app) => {
  //use informa o formato do arquivo enviado
  app.use(express.json());

  // get envia dados para o client
  app.get("/fornecedores", (req, res) => {
    Fornecedores.lista(res);
  });

  app.get("/fornecedores/:id", (req, res) => {
    // converte o id da requisicao para inteiro para que possa ser trabalhado pelo banco sql
    const id = parseInt(req.params.id);

    Fornecedores.buscaPorId(id, res);
  });

  // post envia dados do cliente para o servidor
  app.post("/fornecedores", (req, res) => {
    // req.body pega o corpo da requisicao (o que foi digitado no client)
    const fornecedores = req.body;

    Fornecedores.adiciona(fornecedores, res);

    console.log(fornecedores);
  });

  // patch altera os dados de um fornecedor. OBS - o patch altera alguns dados do objeto. O put altera todos os campos do objeto, entao, mesmo com dados iguais, todos os campos devem ser preenchidos
  app.patch("/fornecedores/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    Fornecedores.altera(id, valores, res);
  });

  // delete apaga um fornecedor
  app.delete("/fornecedores/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Fornecedores.deleta(id, res);
  });
};

// Sera usado o postman, que ira simular as requisicoes solicitadas pelo cliente
