// Repositório em memória, com a mesma interface do repositório da API.
// Os módulos que ainda não foram ligados ao banco usam este (dados de
// demonstração que somem ao fechar o app). Quando um módulo for migrado,
// basta trocar por criarRepositorioApi(...) na sua configuração.

export function criarRepositorioLocal(dadosIniciais = []) {
  let itens = dadosIniciais.map((item) => ({ ...item }));

  return {
    origem: 'local',

    async list() {
      return itens.map((item) => ({ ...item }));
    },

    async create(valores) {
      const id = Date.now().toString();
      itens = [{ id, ...valores }, ...itens];
      return { sucesso: true, id };
    },

    async update(id, valores) {
      itens = itens.map((item) => (item.id === id ? { ...item, ...valores, id } : item));
      return { sucesso: true };
    },

    async remove(id) {
      itens = itens.filter((item) => item.id !== id);
      return { sucesso: true };
    },
  };
}
