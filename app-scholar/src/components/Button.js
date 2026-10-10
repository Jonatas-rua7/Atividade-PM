import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, spacing } from '../theme';

const VARIANTES = {
  primary: { fundo: colors.primary, texto: colors.textOnPrimary, borda: colors.primary },
  secondary: { fundo: colors.surface, texto: colors.primary, borda: colors.border },
  danger: { fundo: colors.danger, texto: colors.textOnPrimary, borda: colors.danger },
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  style,
}) {
  const cores = VARIANTES[variant];
  const bloqueado = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={bloqueado}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.botao,
        { backgroundColor: cores.fundo, borderColor: cores.borda },
        pressed && styles.pressionado,
        bloqueado && styles.desabilitado,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={cores.texto} />
      ) : (
        <>
          {icon ? <Ionicons name={icon} size={20} color={cores.texto} style={styles.icone} /> : null}
          <Text style={[styles.texto, { color: cores.texto }]}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  texto: {
    fontSize: 16,
    fontWeight: '700',
  },
  icone: {
    marginRight: spacing.sm,
  },
  pressionado: {
    opacity: 0.85,
  },
  desabilitado: {
    opacity: 0.55,
  },
});
