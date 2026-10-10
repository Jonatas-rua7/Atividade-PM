import { API_TIMEOUT_MS, API_URL } from '../config';

// Cliente HTTP único para toda a API PHP. Troca o "alunos, cursos..." por
// `entity` na query string, exatamente como o api.php espera.
async function requisicao(entity, action, { method = 'GET', body, params } = {}) {
  const query = new URLSearchParams({ entity, action, ...params });
  const url = `${API_URL}?${query.toString()}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (error) {
    throw new Error(
      `Não foi possível conectar à API em ${API_URL}.\n\n` +
        'Confira se o Apache e o MySQL do XAMPP estão ligados e se o celular ' +
        'está na mesma rede do computador.'
    );
  } finally {
    clearTimeout(timer);
  }

  const texto = await response.text();

  let resposta;
  try {
    resposta = JSON.parse(texto);
  } catch (error) {
    throw new Error('A API não retornou JSON. Verifique a URL e os erros do PHP no Apache.');
  }

  if (!response.ok || resposta.sucesso === false) {
    throw new Error(resposta.erro || resposta.message || 'Erro ao acessar a API.');
  }

  return resposta;
}

// Repositório genérico: toda entidade da API expõe list/create/update/remove.
// `mapear` converte a linha do banco no formato usado pelas telas.
export function criarRepositorioApi(entity, { mapear = (linha) => linha } = {}) {
  return {
    origem: 'api',

    async list() {
      const { dados = [] } = await requisicao(entity, 'list');
      return dados.map(mapear);
    },

    async create(valores) {
      return requisicao(entity, 'create', { method: 'POST', body: valores });
    },

    async update(id, valores) {
      return requisicao(entity, 'update', { method: 'PUT', body: { ...valores, id } });
    },

    async remove(id) {
      return requisicao(entity, 'delete', { method: 'DELETE', params: { id } });
    },
  };
}
