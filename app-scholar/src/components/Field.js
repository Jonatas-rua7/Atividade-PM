import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, radius, spacing } from '../theme';

export default function Field({ label, error, required = false, style, ...inputProps }) {
  const [focado, setFocado] = useState(false);

  return (
    <View style={[styles.grupo, style]}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.obrigatorio}> *</Text> : null}
      </Text>

      <TextInput
        style={[styles.input, focado && styles.focado, error && styles.comErro]}
        placeholderTextColor={colors.textMuted}
        onFocus={() => setFocado(true)}
        onBlur={() => setFocado(false)}
        accessibilityLabel={label}
        {...inputProps}
      />

      {error ? <Text style={styles.erro}>{error}</Text> : null}
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
  input: {
    minHeight: 50,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    color: colors.text,
  },
  focado: {
    borderColor: colors.primary,
  },
  comErro: {
    borderColor: colors.danger,
  },
  erro: {
    marginTop: spacing.xs,
    fontSize: 13,
    color: colors.danger,
  },
});
