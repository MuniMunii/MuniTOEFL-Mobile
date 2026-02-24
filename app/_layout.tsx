import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'expo-router/entry';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    // 'Outfit-Regular': require('../assets/fonts/outfit/Outfit-Regular.ttf'),
    // 'Outfit-Semibold': require('../assets/fonts/outfit/Outfit-SemiBold.ttf'),
    // 'Outfit-Bold': require('../assets/fonts/outfit/Outfit-Bold.ttf'),
    // 'Outfit-ExtraLight': require('../assets/fonts/outfit/Outfit-ExtraLight.ttf'),
    // 'Outfit-Thin': require('../assets/fonts/outfit/Outfit-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <Stack />;
}
