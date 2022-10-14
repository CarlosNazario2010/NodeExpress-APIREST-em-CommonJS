// modulo responsavel por subir o servidor

// importa o servidor
const customExpress = require("./config/customExpress");

// importa a conexao
const conexao = require("./infraestrutura/conexao");

// importa as tabelas do banco
const TabelasAtendimento = require("./infraestrutura/tabelasAtendimento");
const TabelaFornecedores = require("./infraestrutura/tabelaFornecedores");

// cria a conexao com o banco de dados
conexao.connect((erro) => {
  // se der erro, exibe o erro
  if (erro) {
    console.log(erro);
  }

  // senao, imprime no console que o banco esta conectado
  else {
    console.log("Conectado com sucesso.");

    // cria as tabelas do banco, caso ainda nao tenham sido criadas
    TabelasAtendimento.init(conexao);
    TabelaFornecedores.init(conexao);

    // instancia o servidor
    const app = customExpress();

    // servidor no ar, na porta 3000 no caso, junto com a mensagem de sucesso no console
    app.listen(3000, () => console.log("servidor rodando na porta 3000"));
  }
});
