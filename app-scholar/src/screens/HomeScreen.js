import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MODULOS } from '../modules';
import { colors, radius, shadow, spacing } from '../theme';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <View style={[styles.hero, { paddingTop: insets.top + spacing.lg }]}>
        <View style={styles.heroTopo}>
          <View style={styles.logo}>
            <Text style={styles.logoTexto}>AS</Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate('Sobre')}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Sobre o aplicativo"
            style={styles.botaoSobre}
          >
            <Ionicons name="information-circle-outline" size={26} color={colors.textOnPrimary} />
          </Pressable>
        </View>

        <Text style={styles.titulo}>APP Scholar</Text>
        <Text style={styles.subtitulo}>Sistema acadêmico mobile</Text>
      </View>

      <Text style={styles.secao}>Módulos</Text>

      <View style={styles.grade}>
        {MODULOS.map((modulo) => (
          <Pressable
            key={modulo.key}
            onPress={() => navigation.navigate('Lista', { modulo: modulo.key })}
            accessibilityRole="button"
            accessibilityLabel={modulo.titulo}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressionado]}
          >
            <View style={[styles.icone, { backgroundColor: `${modulo.cor}1A` }]}>
              <Ionicons name={modulo.icone} size={28} color={modulo.cor} />
            </View>
            <Text style={styles.cardTitulo}>{modulo.titulo}</Text>
          </Pressable>
        ))}
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
    paddingBottom: spacing.xxl,
  },
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTexto: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  botaoSobre: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  titulo: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.textOnPrimary,
  },
  subtitulo: {
    fontSize: 16,
    color: colors.primarySoft,
    marginTop: spacing.xs,
  },
  secao: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    marginHorizontal: spacing.xl,
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadow,
  },
  cardPressionado: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  icone: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  cardTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  rodape: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.textMuted,
    marginTop: spacing.lg,
  },
});
