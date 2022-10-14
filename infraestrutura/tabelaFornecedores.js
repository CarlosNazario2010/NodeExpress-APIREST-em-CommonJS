// modulo que cria as tabelas do banco de dados

class TabelasFornecedores {
  // construtor das tabelas
  init(conexao) {
    this.conexao = conexao;

    // cria a tabela com o metodo abaixo
    this.criarFornecedores();
  }

  criarFornecedores() {
    // metodo sql que cria a tabela e seus campos
    const sql =
      "CREATE TABLE IF NOT EXISTS Fornecedores (id int NOT NULL AUTO_INCREMENT, dataCriacao datetime NOT NULL, data datetime NOT NULL, fornecedor varchar(20) NOT NULL, produto varchar(20), quantidade varchar(10) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))";

    // query sql que cria as tabelas no banco
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela fornecedores criada com sucesso");
      }
    });
  }
}

module.exports = new TabelasFornecedores();
