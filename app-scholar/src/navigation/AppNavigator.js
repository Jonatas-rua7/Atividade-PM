import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AboutScreen from '../screens/AboutScreen';
import EntityFormScreen from '../screens/EntityFormScreen';
import EntityListScreen from '../screens/EntityListScreen';
import HomeScreen from '../screens/HomeScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

const tema = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.primary,
    text: colors.textOnPrimary,
    border: 'transparent',
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={tema}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.textOnPrimary,
          headerTitleStyle: { fontWeight: '700' },
          headerBackTitle: 'Voltar',
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sobre" component={AboutScreen} options={{ title: 'Sobre' }} />
        <Stack.Screen name="Lista" component={EntityListScreen} />
        <Stack.Screen name="Formulario" component={EntityFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
