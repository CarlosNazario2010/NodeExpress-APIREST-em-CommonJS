// modulo responsavel por criar a conexao

// importa o mysql
const mysql = require("mysql");

// configuracoes da conexao
const conexao = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "agenda-petshop",
});

module.exports = conexao;
