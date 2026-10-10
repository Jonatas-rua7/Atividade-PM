import { criarRepositorioApi } from '../services/api';
import { criarRepositorioLocal } from '../services/localRepository';

// ---------------------------------------------------------------------------
// Cada módulo do app é descrito por um objeto. As telas de lista e de
// formulário são genéricas e se montam a partir dele:
//
//   key        identificador usado na navegação
//   titulo     nome no plural (menu e cabeçalho da lista)
//   singular   nome no singular, minúsculo ("aluno")
//   artigo     'o' ou 'a', para "Novo aluno" / "Nova turma"
//   icone/cor  aparência na Home
//   repositorio  de onde vêm os dados (API ou memória)
//   campos     campos do formulário (ver fieldTypes.js)
//   titulo/linhas/busca  como cada item aparece na lista
// ---------------------------------------------------------------------------

// ----- Alunos: módulo-modelo, ligado ao banco com campos reais -------------
const repositorioCursos = criarRepositorioApi('cursos');

const alunos = {
  key: 'alunos',
  titulo: 'Alunos',
  singular: 'aluno',
  artigo: 'o',
  icone: 'school-outline',
  cor: '#1565C0',
  repositorio: criarRepositorioApi('alunos'),
  campos: [
    { name: 'nome', label: 'Nome completo', placeholder: 'Ex: Enzo Gabriel Santos', required: true },
    { name: 'email', label: 'E-mail', type: 'email', placeholder: 'aluno@email.com' },
    { name: 'cpf', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00' },
    { name: 'data_de_nascimento', label: 'Data de nascimento', type: 'date' },
    {
      name: 'id_curso',
      label: 'Curso',
      type: 'select',
      required: true,
      placeholder: 'Selecione o curso',
      carregarOpcoes: async () => {
        const cursos = await repositorioCursos.list();
        return cursos.map((curso) => ({ value: String(curso.id), label: curso.nome }));
      },
    },
  ],
  tituloDoItem: (item) => item.nome,
  linhasDoItem: (item) => [item.nome_do_curso || 'Sem curso', item.email],
  textoDeBusca: (item) =>
    [item.nome, item.email, item.cpf, item.nome_do_curso].filter(Boolean).join(' '),
};

// ----- Demais módulos: ainda com dados de demonstração em memória ----------
// Para migrar um módulo para o banco: trocar `criarRepositorioLocal(...)` por
// `criarRepositorioApi('<entidade>')`, trocar os campos genéricos pelos reais
// e ajustar o trecho correspondente no api.php (use o de alunos como exemplo).
function moduloDemonstracao({ campos, seed, ...resto }) {
  const [principal, segundo, terceiro] = campos;

  return {
    ...resto,
    repositorio: criarRepositorioLocal(seed),
    campos: [
      { name: 'nome', required: true, ...principal },
      { name: 'info1', ...segundo },
      { name: 'info2', ...terceiro },
    ],
    tituloDoItem: (item) => item.nome,
    linhasDoItem: (item) => [item.info1, item.info2],
    textoDeBusca: (item) => [item.nome, item.info1, item.info2].filter(Boolean).join(' '),
  };
}

const professores = moduloDemonstracao({
  key: 'professores',
  titulo: 'Professores',
  singular: 'professor',
  artigo: 'o',
  icone: 'person-outline',
  cor: '#6A1B9A',
  campos: [
    { label: 'Nome', placeholder: 'Nome do professor' },
    { label: 'Disciplina', placeholder: 'Ex: Matemática' },
    { label: 'E-mail', type: 'email', placeholder: 'professor@escola.com' },
  ],
  seed: [
    { id: '1', nome: 'João da Silva', info1: 'Matemática', info2: 'joao@escola.com' },
    { id: '2', nome: 'Maria Santos', info1: 'Português', info2: 'maria@escola.com' },
    { id: '3', nome: 'Carlos Oliveira', info1: 'Programação', info2: 'carlos@escola.com' },
  ],
});

const turmas = moduloDemonstracao({
  key: 'turmas',
  titulo: 'Turmas',
  singular: 'turma',
  artigo: 'a',
  icone: 'people-outline',
  cor: '#00897B',
  campos: [
    { label: 'Nome da turma', placeholder: 'Ex: DS-2026-A' },
    { label: 'Curso', placeholder: 'Ex: Desenvolvimento de Sistemas' },
    { label: 'Sala', placeholder: 'Ex: Sala 12' },
  ],
  seed: [
    { id: '1', nome: 'DS-2026-A', info1: 'Desenvolvimento de Sistemas', info2: 'Sala 12' },
    { id: '2', nome: 'DS-2026-B', info1: 'Desenvolvimento de Sistemas', info2: 'Sala 14' },
  ],
});

const cursos = moduloDemonstracao({
  key: 'cursos',
  titulo: 'Cursos',
  singular: 'curso',
  artigo: 'o',
  icone: 'library-outline',
  cor: '#EF6C00',
  campos: [
    { label: 'Nome do curso', placeholder: 'Ex: Desenvolvimento de Sistemas' },
    { label: 'Duração', placeholder: 'Ex: 4 semestres' },
    { label: 'Área', placeholder: 'Ex: Tecnologia' },
  ],
  seed: [
    { id: '1', nome: 'Desenvolvimento de Sistemas', info1: '4 semestres', info2: 'Tecnologia' },
    { id: '2', nome: 'Administração', info1: '4 semestres', info2: 'Gestão' },
  ],
});

const disciplinas = moduloDemonstracao({
  key: 'disciplinas',
  titulo: 'Disciplinas',
  singular: 'disciplina',
  artigo: 'a',
  icone: 'book-outline',
  cor: '#C62828',
  campos: [
    { label: 'Disciplina', placeholder: 'Nome da disciplina' },
    { label: 'Carga horária', placeholder: 'Ex: 80 horas' },
    { label: 'Professor', placeholder: 'Nome do professor' },
  ],
  seed: [
    { id: '1', nome: 'Programação Mobile', info1: '80 horas', info2: 'Carlos Oliveira' },
    { id: '2', nome: 'Banco de Dados', info1: '80 horas', info2: 'João da Silva' },
  ],
});

const matriculas = moduloDemonstracao({
  key: 'matriculas',
  titulo: 'Matrículas',
  singular: 'matrícula',
  artigo: 'a',
  icone: 'document-text-outline',
  cor: '#283593',
  campos: [
    { label: 'Aluno', placeholder: 'Nome do aluno' },
    { label: 'Curso', placeholder: 'Nome do curso' },
    { label: 'Turma', placeholder: 'Ex: DS-2026-A' },
  ],
  seed: [
    { id: '1', nome: 'Pedro Almeida', info1: 'Desenvolvimento de Sistemas', info2: 'DS-2026-A' },
    { id: '2', nome: 'Lucas Oliveira', info1: 'Desenvolvimento de Sistemas', info2: 'DS-2026-B' },
  ],
});

const responsaveis = moduloDemonstracao({
  key: 'responsaveis',
  titulo: 'Responsáveis',
  singular: 'responsável',
  artigo: 'o',
  icone: 'people-circle-outline',
  cor: '#AD1457',
  campos: [
    { label: 'Nome', placeholder: 'Nome do responsável' },
    { label: 'Aluno', placeholder: 'Nome do aluno' },
    { label: 'Telefone', placeholder: '(00) 00000-0000', keyboardType: 'phone-pad' },
  ],
  seed: [
    { id: '1', nome: 'Ana Almeida', info1: 'Pedro Almeida', info2: '(11) 99999-1111' },
    { id: '2', nome: 'Marcos Oliveira', info1: 'Lucas Oliveira', info2: '(11) 98888-2222' },
  ],
});

const avaliacoes = moduloDemonstracao({
  key: 'avaliacoes',
  titulo: 'Avaliações',
  singular: 'avaliação',
  artigo: 'a',
  icone: 'clipboard-outline',
  cor: '#00838F',
  campos: [
    { label: 'Aluno', placeholder: 'Nome do aluno' },
    { label: 'Disciplina', placeholder: 'Nome da disciplina' },
    { label: 'Nota', placeholder: 'Ex: 8,5', keyboardType: 'decimal-pad' },
  ],
  seed: [
    { id: '1', nome: 'Pedro Almeida', info1: 'Programação Mobile', info2: '8,5' },
    { id: '2', nome: 'Lucas Oliveira', info1: 'Banco de Dados', info2: '9,0' },
  ],
});

const coordenadores = moduloDemonstracao({
  key: 'coordenadores',
  titulo: 'Coordenadores',
  singular: 'coordenador',
  artigo: 'o',
  icone: 'ribbon-outline',
  cor: '#4E342E',
  campos: [
    { label: 'Nome', placeholder: 'Nome do coordenador' },
    { label: 'Curso', placeholder: 'Nome do curso' },
    { label: 'E-mail', type: 'email', placeholder: 'coordenador@escola.com' },
  ],
  seed: [
    { id: '1', nome: 'Roberto Santos', info1: 'Desenvolvimento de Sistemas', info2: 'roberto@escola.com' },
    { id: '2', nome: 'Patricia Lima', info1: 'Administração', info2: 'patricia@escola.com' },
  ],
});

const boletins = moduloDemonstracao({
  key: 'boletins',
  titulo: 'Boletins',
  singular: 'boletim',
  artigo: 'o',
  icone: 'stats-chart-outline',
  cor: '#2E7D32',
  campos: [
    { label: 'Aluno', placeholder: 'Nome do aluno' },
    { label: 'Período', placeholder: 'Ex: 1º Semestre' },
    { label: 'Média', placeholder: 'Ex: 8,5', keyboardType: 'decimal-pad' },
  ],
  seed: [
    { id: '1', nome: 'Pedro Almeida', info1: '1º Semestre', info2: 'Média: 8,5' },
    { id: '2', nome: 'Lucas Oliveira', info1: '1º Semestre', info2: 'Média: 9,0' },
  ],
});

// Ordem em que aparecem na Home.
export const MODULOS = [
  alunos,
  professores,
  turmas,
  cursos,
  disciplinas,
  matriculas,
  responsaveis,
  avaliacoes,
  coordenadores,
  boletins,
];

export function obterModulo(key) {
  return MODULOS.find((modulo) => modulo.key === key);
}
