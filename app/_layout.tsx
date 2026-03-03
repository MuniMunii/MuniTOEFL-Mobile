import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'expo-router/entry';
import tamaguiConfig from '../tamagui.config'
import { TamaguiProvider} from 'tamagui';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme=useColorScheme()
  const [loaded] = useFonts({
    'Outfit-Regular': require('./assets/fonts/outfit/Outfit-Regular.ttf'),
    'Outfit-Semibold': require('./assets/fonts/outfit/Outfit-SemiBold.ttf'),
    'Outfit-Bold': require('./assets/fonts/outfit/Outfit-Bold.ttf'),
    'Outfit-ExtraLight': require('./assets/fonts/outfit/Outfit-ExtraLight.ttf'),
    'Outfit-Thin': require('./assets/fonts/outfit/Outfit-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return( 
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme ?? "light"}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
);
}
