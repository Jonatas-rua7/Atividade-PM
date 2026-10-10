import {
  brParaIso,
  cpfValido,
  emailValido,
  isoParaBr,
  mascararCpf,
  mascararData,
  somenteDigitos,
} from '../utils/format';

// Cada tipo de campo diz como: formatar enquanto digita (`mascarar`), converter
// do banco para a tela (`deApi`), da tela para o banco (`paraApi`) e validar.
// Para criar um tipo novo (ex.: telefone) basta adicionar uma entrada aqui.
export const TIPOS_DE_CAMPO = {
  text: {
    mascarar: (valor) => valor,
    deApi: (valor) => (valor == null ? '' : String(valor)),
    paraApi: (valor) => valor.trim(),
    validar: () => null,
  },

  email: {
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    mascarar: (valor) => valor.trim(),
    deApi: (valor) => (valor == null ? '' : String(valor)),
    paraApi: (valor) => valor.trim(),
    validar: (valor) => (valor && !emailValido(valor) ? 'Digite um e-mail válido.' : null),
  },

  cpf: {
    keyboardType: 'number-pad',
    maxLength: 14,
    mascarar: mascararCpf,
    deApi: (valor) => mascararCpf(valor == null ? '' : String(valor)),
    paraApi: somenteDigitos,
    // O dígito verificador só é exigido quando o CPF é digitado/alterado. Assim
    // dá para editar alunos antigos do banco (cujos CPFs de teste não fecham).
    validar: (valor, original) => {
      if (!valor || valor === original) return null;
      return cpfValido(valor) ? null : 'CPF inválido.';
    },
  },

  date: {
    keyboardType: 'number-pad',
    maxLength: 10,
    placeholder: 'DD/MM/AAAA',
    mascarar: mascararData,
    deApi: (valor) => isoParaBr(valor),
    paraApi: (valor) => brParaIso(valor),
    validar: (valor) => (valor && !brParaIso(valor) ? 'Data inválida. Use DD/MM/AAAA.' : null),
  },

  select: {
    mascarar: (valor) => valor,
    deApi: (valor) => (valor == null ? '' : String(valor)),
    paraApi: (valor) => valor,
    validar: () => null,
  },
};

export function tipoDoCampo(campo) {
  return TIPOS_DE_CAMPO[campo.type || 'text'];
}
