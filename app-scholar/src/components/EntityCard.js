import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, shadow, spacing } from '../theme';
import { iniciais } from '../utils/format';

// Card de item da lista: toque para editar, ícone da lixeira para excluir.
export default function EntityCard({ titulo, linhas = [], cor, onPress, onExcluir }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Editar ${titulo}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressionado]}
    >
      <View style={[styles.avatar, { backgroundColor: `${cor}22` }]}>
        <Text style={[styles.avatarTexto, { color: cor }]}>{iniciais(titulo)}</Text>
      </View>

      <View style={styles.informacoes}>
        <Text style={styles.titulo} numberOfLines={1}>
          {titulo}
        </Text>
        {linhas.filter(Boolean).map((linha, indice) => (
          <Text key={indice} style={styles.linha} numberOfLines={1}>
            {linha}
          </Text>
        ))}
      </View>

      <Pressable
        onPress={onExcluir}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Excluir ${titulo}`}
        style={styles.excluir}
      >
        <Ionicons name="trash-outline" size={20} color={colors.danger} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow,
  },
  pressionado: {
    opacity: 0.85,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTexto: {
    fontSize: 17,
    fontWeight: '700',
  },
  informacoes: {
    flex: 1,
    marginLeft: spacing.md,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  linha: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  excluir: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dangerSoft,
    marginLeft: spacing.sm,
  },
});
