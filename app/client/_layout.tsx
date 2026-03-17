import { Stack } from "expo-router";
import { authClient } from "../../lib/authClients";
export default function ClientLayout() {
  const { data: session, isPending } = authClient.useSession.get();
  return (
    <>
      <Stack
        screenOptions={{ presentation: "transparentModal", headerShown: false }}
      >
        <Stack.Screen name="auth/(auth)"></Stack.Screen>
        <Stack.Protected guard={!!session && session.user.role !== "admin"}>
          <Stack.Screen name={"dashboard"} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
