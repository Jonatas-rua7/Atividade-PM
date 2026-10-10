import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { MODULOS } from '../modules';
import { colors, radius, shadow, spacing } from '../theme';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <View style={styles.logo}>
        <Text style={styles.logoTexto}>AS</Text>
      </View>

      <Text style={styles.titulo}>APP Scholar</Text>
      <Text style={styles.subtitulo}>Sistema acadêmico mobile</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Sobre o aplicativo</Text>
        <Text style={styles.texto}>
          O APP Scholar organiza as informações da gestão escolar em um só lugar: cadastro,
          consulta, edição e exclusão de registros.
        </Text>
        <Text style={styles.texto}>
          Módulos disponíveis: {MODULOS.map((modulo) => modulo.titulo.toLowerCase()).join(', ')}.
        </Text>
      </View>

      <Text style={styles.rodape}>APP Scholar · 2026</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  conteudo: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  logoTexto: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.textOnPrimary,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.lg,
  },
  subtitulo: {
    fontSize: 16,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginTop: spacing.xl,
    ...shadow,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  texto: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  rodape: {
    marginTop: spacing.xl,
    fontSize: 13,
    color: colors.textMuted,
  },
});
