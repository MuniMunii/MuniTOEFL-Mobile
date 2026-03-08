import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'expo-router/entry';
import tamaguiConfig from '../tamagui.config'
import { TamaguiProvider} from 'tamagui';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { authClient } from './lib/authClients';
import BottomNavbar from './components/navigation/bottomNav';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const {data:session,isPending}=authClient.useSession.get()
  const colorScheme=useColorScheme()
  const [loaded] = useFonts({
    'Outfit-Regular': require('./assets/fonts/outfit/Outfit-Regular.ttf'),
    'Outfit-Semibold': require('./assets/fonts/outfit/Outfit-SemiBold.ttf'),
    'Outfit-Bold': require('./assets/fonts/outfit/Outfit-Bold.ttf'),
    'Outfit-ExtraLight': require('./assets/fonts/outfit/Outfit-ExtraLight.ttf'),
    'Outfit-Thin': require('./assets/fonts/outfit/Outfit-Thin.ttf'),
  });
  useEffect(()=>{
    async function fetchSession(){
      if(!session){
        await authClient.getSession()
      }
      return
    }
  fetchSession()
  },[isPending,session])
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
        <Stack screenOptions={{headerShown:false,presentation:"transparentModal",animation:'slide_from_right',animationDuration:600}}>
          <Stack.Screen name={'(home)'}/>
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
);
}
