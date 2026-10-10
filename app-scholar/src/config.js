import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Endereço da API PHP (XAMPP). Ordem de prioridade:
// 1. Variável EXPO_PUBLIC_API_URL (ex.: no arquivo .env do projeto)
// 2. O mesmo IP do computador que está servindo o Expo (funciona no celular
//    físico, desde que celular e computador estejam na mesma rede Wi-Fi)
// 3. 10.0.2.2 no emulador Android, localhost no resto
function resolverApiUrl() {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  const hostUri = Constants.expoConfig?.hostUri;
  const host = hostUri
    ? hostUri.split(':')[0]
    : Platform.OS === 'android'
      ? '10.0.2.2'
      : 'localhost';

  return `http://${host}/app_escolar_api/api.php`;
}

export const API_URL = resolverApiUrl();
export const API_TIMEOUT_MS = 10000;
