import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Button from './Button';
import { colors, spacing } from '../theme';

// Estados de tela: carregando, erro (com "tentar de novo") e lista vazia.
export function Carregando({ texto = 'Carregando...' }) {
  return (
    <View style={styles.centro}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
}

export function Erro({ mensagem, onTentarNovamente }) {
  return (
    <View style={styles.centro}>
      <Ionicons name="cloud-offline-outline" size={48} color={colors.danger} />
      <Text style={styles.titulo}>Algo deu errado</Text>
      <Text style={styles.texto}>{mensagem}</Text>
      {onTentarNovamente ? (
        <Button
          title="Tentar novamente"
          icon="refresh"
          variant="secondary"
          onPress={onTentarNovamente}
          style={styles.botao}
        />
      ) : null}
    </View>
  );
}

export function Vazio({ icone = 'file-tray-outline', titulo, texto }) {
  return (
    <View style={styles.centro}>
      <Ionicons name={icone} size={48} color={colors.textMuted} />
      <Text style={styles.titulo}>{titulo}</Text>
      {texto ? <Text style={styles.texto}>{texto}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  centro: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    marginTop: spacing.xl,
  },
  titulo: {
    marginTop: spacing.md,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  texto: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
    textAlign: 'center',
  },
  botao: {
    marginTop: spacing.lg,
  },
});
