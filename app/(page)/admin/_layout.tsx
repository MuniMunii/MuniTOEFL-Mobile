import { Redirect, Stack } from "expo-router";
import { authClient } from "../../../lib/authClients";
export default function ClientLayout() {
  const { data: session } = authClient.useSession.get();
  if (!session || session.user.role !== "admin") {
  return <Redirect href="/__not_found" />;
}
  return (
    <>
      <Stack
        screenOptions={{ presentation: "transparentModal", headerShown: false }}
      >
        <Stack.Protected guard={!session?.session}>
          <Stack.Screen name={"/client/auth/login"} />
        </Stack.Protected>
        <Stack.Protected guard={!!session && session.user.role === "admin"}>
          <Stack.Screen name={"dashboard"} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
