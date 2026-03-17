import { Stack } from "expo-router";
import { authClient } from "../../lib/authClients";
import HeaderClient from "../../components/header/header";

export default function ClientLayout() {
  const { data: session } = authClient.useSession.get();
  return (
    <>
      <Stack
        screenOptions={{ presentation: "transparentModal", headerShown: false }}
      >
        <Stack.Protected guard={!!session && session.user.role === "admin"}>
          <Stack.Screen name={"dashboard"} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
