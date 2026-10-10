import React, { useLayoutEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import EntityCard from '../components/EntityCard';
import { Carregando, Erro, Vazio } from '../components/StateView';
import useColecao from '../hooks/useColecao';
import { obterModulo } from '../modules';
import { colors, radius, shadow, spacing } from '../theme';
import { avisar, confirmar } from '../utils/dialogs';

// Tela de lista usada por TODOS os módulos. O que muda entre eles vem do
// objeto de configuração em src/modules/index.js.
export default function EntityListScreen({ navigation, route }) {
  const modulo = obterModulo(route.params.modulo);
  const { itens, carregando, atualizando, erro, carregar } = useColecao(modulo.repositorio);
  const [busca, setBusca] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ title: modulo.titulo });
  }, [navigation, modulo.titulo]);

  const resultados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return itens;
    return itens.filter((item) => modulo.textoDeBusca(item).toLowerCase().includes(termo));
  }, [itens, busca, modulo]);

  function abrirFormulario(item) {
    navigation.navigate('Formulario', { modulo: modulo.key, item });
  }

  async function excluir(item) {
    const confirmado = await confirmar(
      `Excluir ${modulo.singular}`,
      `Tem certeza que deseja excluir "${modulo.tituloDoItem(item)}"? Essa ação não pode ser desfeita.`,
      'Excluir'
    );
    if (!confirmado) return;

    try {
      await modulo.repositorio.remove(item.id);
      await carregar();
    } catch (error) {
      avisar('Não foi possível excluir', error.message);
    }
  }

  const demonstracao = modulo.repositorio.origem === 'local';

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <View style={styles.busca}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            style={styles.buscaInput}
            placeholder={`Buscar ${modulo.singular}`}
            placeholderTextColor={colors.textMuted}
            value={busca}
            onChangeText={setBusca}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {busca ? (
            <Pressable onPress={() => setBusca('')} hitSlop={8} accessibilityLabel="Limpar busca">
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </Pressable>
          ) : null}
        </View>

        {demonstracao ? (
          <View style={styles.aviso}>
            <Ionicons name="information-circle-outline" size={18} color={colors.warning} />
            <Text style={styles.avisoTexto}>
              Dados de demonstração: este módulo ainda não está ligado ao banco e os registros
              somem ao fechar o app.
            </Text>
          </View>
        ) : null}
      </View>

      {carregando ? (
        <Carregando />
      ) : erro && itens.length === 0 ? (
        <Erro mensagem={erro} onTentarNovamente={() => carregar()} />
      ) : (
        <FlatList
          data={resultados}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.lista}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={atualizando}
              onRefresh={() => carregar({ puxar: true })}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          ListHeaderComponent={
            itens.length > 0 ? (
              <Text style={styles.contador}>
                {resultados.length} de {itens.length} {itens.length === 1 ? 'registro' : 'registros'}
              </Text>
            ) : null
          }
          ListEmptyComponent={
            busca ? (
              <Vazio icone="search-outline" titulo="Nada encontrado" texto={`Nenhum resultado para "${busca}".`} />
            ) : (
              <Vazio
                titulo={`Nenhum ${modulo.singular} cadastrado`}
                texto="Toque no botão + para cadastrar o primeiro."
              />
            )
          }
          renderItem={({ item }) => (
            <EntityCard
              titulo={modulo.tituloDoItem(item)}
              linhas={modulo.linhasDoItem(item)}
              cor={modulo.cor}
              onPress={() => abrirFormulario(item)}
              onExcluir={() => excluir(item)}
            />
          )}
        />
      )}

      <Pressable
        style={({ pressed }) => [styles.fab, { backgroundColor: modulo.cor }, pressed && styles.fabPressionado]}
        onPress={() => abrirFormulario(undefined)}
        accessibilityRole="button"
        accessibilityLabel={`Cadastrar ${modulo.singular}`}
      >
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topo: {
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  buscaInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: spacing.sm,
    paddingVertical: spacing.sm,
  },
  aviso: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.warningSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  avisoTexto: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 13,
    lineHeight: 18,
    color: colors.warning,
  },
  lista: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  contador: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  fab: {
    position: 'absolute',
    right: spacing.xl,
    bottom: spacing.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
    shadowOpacity: 0.25,
    elevation: 6,
  },
  fabPressionado: {
    opacity: 0.85,
  },
});
