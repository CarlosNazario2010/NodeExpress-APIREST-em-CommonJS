// modulo responsavel por configurar o servidor

// importa o express
const express = require("express");

// importa o consign
const consign = require("consign");

module.exports = () => {
  // cria e retorna o servidor
  const app = express();

  // os controladores sao incluidos no app com o consign
  consign().include("controllers").into(app);

  return app;
};
