import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, spacing } from '../theme';

// Campo de seleção: abre uma lista em modal. `opcoes` = [{ value, label }].
export default function SelectField({
  label,
  value,
  opcoes = [],
  onChange,
  placeholder = 'Selecione',
  carregando = false,
  error,
  required = false,
}) {
  const [aberto, setAberto] = useState(false);
  const selecionada = opcoes.find((opcao) => String(opcao.value) === String(value));

  function escolher(opcao) {
    onChange(opcao.value);
    setAberto(false);
  }

  return (
    <View style={styles.grupo}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.obrigatorio}> *</Text> : null}
      </Text>

      <Pressable
        style={[styles.campo, error && styles.comErro]}
        onPress={() => setAberto(true)}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <Text style={selecionada ? styles.valor : styles.placeholder} numberOfLines={1}>
          {selecionada ? selecionada.label : placeholder}
        </Text>
        {carregando ? (
          <ActivityIndicator size="small" color={colors.textMuted} />
        ) : (
          <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
        )}
      </Pressable>

      {error ? <Text style={styles.erro}>{error}</Text> : null}

      <Modal visible={aberto} transparent animationType="fade" onRequestClose={() => setAberto(false)}>
        <Pressable style={styles.fundo} onPress={() => setAberto(false)}>
          <Pressable style={styles.painel} onPress={() => {}}>
            <Text style={styles.tituloPainel}>{label}</Text>

            <FlatList
              data={opcoes}
              keyExtractor={(opcao) => String(opcao.value)}
              ListEmptyComponent={<Text style={styles.vazio}>Nenhuma opção disponível.</Text>}
              renderItem={({ item }) => {
                const ativa = String(item.value) === String(value);
                return (
                  <Pressable style={styles.opcao} onPress={() => escolher(item)}>
                    <Text style={[styles.opcaoTexto, ativa && styles.opcaoAtiva]}>{item.label}</Text>
                    {ativa ? <Ionicons name="checkmark" size={20} color={colors.primary} /> : null}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  grupo: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  obrigatorio: {
    color: colors.danger,
  },
  campo: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
  comErro: {
    borderColor: colors.danger,
  },
  valor: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  placeholder: {
    flex: 1,
    fontSize: 16,
    color: colors.textMuted,
  },
  erro: {
    marginTop: spacing.xs,
    fontSize: 13,
    color: colors.danger,
  },
  fundo: {
    flex: 1,
    backgroundColor: 'rgba(11, 31, 51, 0.5)',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  painel: {
    maxHeight: '70%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  tituloPainel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  opcaoTexto: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  opcaoAtiva: {
    fontWeight: '700',
    color: colors.primary,
  },
  vazio: {
    paddingVertical: spacing.xl,
    textAlign: 'center',
    color: colors.textMuted,
  },
});
