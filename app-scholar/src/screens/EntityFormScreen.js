import React, { useEffect, useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import Button from '../components/Button';
import Field from '../components/Field';
import SelectField from '../components/SelectField';
import { tipoDoCampo } from '../modules/fieldTypes';
import { obterModulo } from '../modules';
import { colors, spacing } from '../theme';
import { avisar } from '../utils/dialogs';

// Formulário usado por TODOS os módulos, tanto para cadastrar quanto para
// editar (quando recebe `item` na rota).
export default function EntityFormScreen({ navigation, route }) {
  const modulo = obterModulo(route.params.modulo);
  const item = route.params.item;
  const editando = Boolean(item);

  const [valores, setValores] = useState(() =>
    Object.fromEntries(
      modulo.campos.map((campo) => [campo.name, tipoDoCampo(campo).deApi(item?.[campo.name])])
    )
  );
  const [erros, setErros] = useState({});
  const [opcoes, setOpcoes] = useState({});
  const [carregandoOpcoes, setCarregandoOpcoes] = useState({});
  const [salvando, setSalvando] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editando ? `Editar ${modulo.singular}` : `Nov${modulo.artigo} ${modulo.singular}`,
    });
  }, [navigation, modulo, editando]);

  // Campos do tipo "select" carregam as opções (ex.: lista de cursos) ao abrir.
  useEffect(() => {
    let ativo = true;

    modulo.campos
      .filter((campo) => campo.carregarOpcoes)
      .forEach(async (campo) => {
        setCarregandoOpcoes((atual) => ({ ...atual, [campo.name]: true }));
        try {
          const lista = await campo.carregarOpcoes();
          if (ativo) setOpcoes((atual) => ({ ...atual, [campo.name]: lista }));
        } catch (error) {
          if (ativo) avisar(`Não foi possível carregar "${campo.label}"`, error.message);
        } finally {
          if (ativo) setCarregandoOpcoes((atual) => ({ ...atual, [campo.name]: false }));
        }
      });

    return () => {
      ativo = false;
    };
  }, [modulo]);

  function alterar(campo, texto) {
    setValores((atual) => ({ ...atual, [campo.name]: tipoDoCampo(campo).mascarar(texto) }));
    if (erros[campo.name]) {
      setErros((atual) => ({ ...atual, [campo.name]: null }));
    }
  }

  function validar() {
    const novosErros = {};

    modulo.campos.forEach((campo) => {
      const valor = valores[campo.name] ?? '';
      if (campo.required && String(valor).trim() === '') {
        novosErros[campo.name] = 'Campo obrigatório.';
        return;
      }
      const tipo = tipoDoCampo(campo);
      const mensagem = tipo.validar(valor, tipo.deApi(item?.[campo.name]));
      if (mensagem) novosErros[campo.name] = mensagem;
    });

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function salvar() {
    if (!validar()) return;

    const payload = Object.fromEntries(
      modulo.campos.map((campo) => [campo.name, tipoDoCampo(campo).paraApi(valores[campo.name] ?? '')])
    );

    try {
      setSalvando(true);
      if (editando) {
        await modulo.repositorio.update(item.id, payload);
      } else {
        await modulo.repositorio.create(payload);
      }
      navigation.goBack();
    } catch (error) {
      avisar('Não foi possível salvar', error.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        {modulo.campos.map((campo) => {
          const tipo = tipoDoCampo(campo);

          if (campo.type === 'select') {
            return (
              <SelectField
                key={campo.name}
                label={campo.label}
                required={campo.required}
                placeholder={campo.placeholder}
                value={valores[campo.name]}
                opcoes={opcoes[campo.name] || []}
                carregando={Boolean(carregandoOpcoes[campo.name])}
                error={erros[campo.name]}
                onChange={(valor) => alterar(campo, String(valor))}
              />
            );
          }

          return (
            <Field
              key={campo.name}
              label={campo.label}
              required={campo.required}
              placeholder={campo.placeholder || tipo.placeholder}
              value={valores[campo.name]}
              error={erros[campo.name]}
              onChangeText={(texto) => alterar(campo, texto)}
              keyboardType={campo.keyboardType || tipo.keyboardType}
              autoCapitalize={campo.autoCapitalize || tipo.autoCapitalize}
              maxLength={tipo.maxLength}
            />
          );
        })}

        <View style={styles.acoes}>
          <Button
            title={editando ? 'Salvar alterações' : 'Cadastrar'}
            icon="checkmark"
            onPress={salvar}
            loading={salvando}
          />
          <Button title="Cancelar" variant="secondary" onPress={() => navigation.goBack()} disabled={salvando} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  conteudo: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  acoes: {
    marginTop: spacing.md,
    gap: spacing.md,
  },
});
