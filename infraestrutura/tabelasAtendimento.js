// modulo que cria as tabelas do banco de dados

class TabelasAtendimento {
  // construtor das tabelas
  init(conexao) {
    this.conexao = conexao;

    // cria a tabela com o metodo abaixo
    this.criarAtendimentos();
  }

  criarAtendimentos() {
    // metodo sql que cria a tabela e seus campos
    const sql =
      "CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, dataCriacao datetime NOT NULL, data datetime NOT NULL, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))";

    // query sql que cria as tabelas no banco
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela atendimentos criada com sucesso");
      }
    });
  }
}

module.exports = new TabelasAtendimento();
