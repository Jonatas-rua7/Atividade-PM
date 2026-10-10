# APP Scholar

Sistema acadêmico mobile (Expo / React Native) com backend PHP + MySQL.

Módulos: Alunos, Professores, Turmas, Cursos, Disciplinas, Matrículas,
Responsáveis, Avaliações, Coordenadores e Boletins.

## Como rodar

1. **Backend (XAMPP):** ligue Apache e MySQL, importe `../Bando_de_Dados2.sql`
   (banco `escola`) e copie `../api.php` e `../cors.php` para
   `htdocs/app_escolar_api/`.
2. **App:**
   ```bash
   npm install
   npx expo start
   ```
3. Abra no celular com o Expo Go (celular e computador na **mesma rede Wi-Fi**).

### Endereço da API

Não precisa mais editar código: o app usa automaticamente o IP do computador
que está servindo o Expo (`http://<ip>/app_escolar_api/api.php`). Para forçar
outro endereço, crie um arquivo `.env` com:

```
EXPO_PUBLIC_API_URL=http://192.168.0.10/app_escolar_api/api.php
```

## Estrutura

```
App.js                      entrada (só monta a navegação)
src/
  theme.js                  cores, espaçamentos e sombras
  config.js                 URL da API
  navigation/AppNavigator   Home → Lista → Formulário (React Navigation)
  screens/
    HomeScreen              menu com os módulos
    EntityListScreen        lista + busca + excluir (serve a TODOS os módulos)
    EntityFormScreen        cadastro/edição (serve a TODOS os módulos)
    AboutScreen
  components/               Button, Field, SelectField, EntityCard, StateView
  modules/
    index.js                configuração de cada módulo (campos, ícone, dados)
    fieldTypes.js           tipos de campo: text, email, cpf, date, select
  services/
    api.js                  cliente HTTP + repositório da API
    localRepository.js      repositório em memória (dados de demonstração)
  hooks/useColecao.js       carrega a lista e recarrega ao voltar para a tela
  utils/                    máscaras/validações e diálogos (funcionam no web)
```

## Estado atual dos módulos

| Módulo | Dados |
| --- | --- |
| **Alunos** | Banco de dados (MySQL), com nome, e-mail, CPF, data de nascimento e curso |
| Demais 9 módulos | Demonstração em memória (somem ao fechar o app) |

A lista de cada módulo ligado à memória mostra um aviso de "dados de demonstração".

## Como migrar o próximo módulo para o banco

Use **Alunos** como modelo:

1. Em `src/modules/index.js`, troque `criarRepositorioLocal(...)` por
   `criarRepositorioApi('<entidade>')` e substitua os campos genéricos por
   campos reais (tipos em `fieldTypes.js`; `select` carrega opções de outra
   entidade, como o campo Curso de Alunos).
2. No `../api.php`, troque o bloco da entidade pelo padrão do bloco de alunos:
   validar a entrada, usar consultas preparadas (`prepare`/`bind_param`) e
   responder `{"sucesso": true}` ou `{"sucesso": false, "erro": "..."}`.
3. Ajuste `tituloDoItem`, `linhasDoItem` e `textoDeBusca` para o formato que
   a API devolve.

Nenhuma tela nova é necessária.
