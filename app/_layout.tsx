import { useFonts } from "expo-font";
import { useNavigationContainerRef } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import "expo-router/entry";
import tamaguiConfig from "../tamagui.config";
import { FontLanguage, PortalProvider, TamaguiProvider } from "tamagui";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  DrawerActions,
  ThemeProvider,
} from "@react-navigation/native";
import { authClient } from "../lib/authClients";
import { onlineManager, QueryClientProvider } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as ExpoDevice from "expo-device";
import * as Network from "expo-network";
import { queryClient } from "../lib/queryClient";
import { FloatingDevTools } from "@buoy-gg/core";
import { useSyncQueriesExternal } from "react-query-external-sync";
import MenuDrawer from "../components/menu/menuDrawer";
import Drawer from "expo-router/drawer";
import HeaderClient from "../components/header/header";
onlineManager.setEventListener((setOnline) => {
  let initialised = false;
  const eventSubscription = Network.addNetworkStateListener((state) => {
    initialised = true;
    setOnline(!!state.isConnected);
  });
  Network.getNetworkStateAsync()
    .then((state) => {
      if (!initialised) {
        setOnline(!!state.isConnected);
      }
    })
    .catch((err) => {
      // getNetworkStateAsync can reject on some platforms/SDK versions
      console.log(err);
    });

  return eventSubscription.remove;
});
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { data: session, isPending } = authClient.useSession.get();
  const colorScheme = useColorScheme();
  const navigate=useNavigationContainerRef()
  const [loaded] = useFonts({
    "Outfit-Regular": require("../assets/fonts/outfit/Outfit-Regular.ttf"),
    "Outfit-Semibold": require("../assets/fonts/outfit/Outfit-SemiBold.ttf"),
    "Outfit-Bold": require("../assets/fonts/outfit/Outfit-Bold.ttf"),
    "Outfit-ExtraLight": require("../assets/fonts/outfit/Outfit-ExtraLight.ttf"),
    "Outfit-Thin": require("../assets/fonts/outfit/Outfit-Thin.ttf"),
  });
  // Triggering fetch session for first launch
  // if theres no session go back to /auth/login
  useEffect(() => {
    async function fetchSession() {
      if (!session) {
        await authClient.getSession();
      }
      return;
    }
    fetchSession();
  }, [isPending, session]);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);
  console.log("Fonts loaded:", loaded);
  useSyncQueriesExternal({
    queryClient,
    socketURL: `${process.env.EXPO_PUBLIC_NGROK}`, // Use local network IP
    deviceName: Platform?.OS || "web",
    platform: Platform?.OS || "web",
    deviceId: Platform?.OS || "web",
    isDevice: ExpoDevice.isDevice,
    extraDeviceInfo: {
      appVersion: "1.0.0",
    },
    enableLogs: false,
    envVariables: {
      NODE_ENV: process.env.NODE_ENV,
    },
    // Storage monitoring
    asyncStorage: AsyncStorage,
    secureStorage: SecureStore,
    secureStorageKeys: ["userToken", "refreshToken"],
  });
  if (!loaded) {
    return null;
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider
          config={tamaguiConfig}
          defaultTheme={colorScheme ?? "light"}
        >
          <PortalProvider>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <FontLanguage body={'default'}>
              <Drawer
                screenOptions={{
                  headerShown:true,
                  // headerTitle:{},
                  drawerItemStyle:{display:'none'},
                  drawerType:'front',
                  header:()=><HeaderClient/>
                }}
                drawerContent={()=><MenuDrawer navigation={navigate}/>}
              >
                <Drawer.Screen name="(page)" options={{
    title: "Home",
    drawerLabel: ()=>null,
  }}/>
              </Drawer>
              </FontLanguage>
            </ThemeProvider>
          </PortalProvider>
        </TamaguiProvider>
      </QueryClientProvider>
      <FloatingDevTools />
    </>
  );
}
