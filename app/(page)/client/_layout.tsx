import { Redirect, Stack } from "expo-router";
import { authClient } from "../../../lib/authClients";
export default function ClientLayout() {
  const { data: session } = authClient.useSession.get();
  return (
    <>
      <Stack
        screenOptions={{ presentation: "transparentModal",headerShown:false,animation:'slide_from_left',animationDuration:200}}
      >
        <Stack.Protected guard={!!!session}>
          <Stack.Screen name={"auth/(auth)"} />
        </Stack.Protected>
        <Stack.Protected guard={!!session && session.user.role !== "admin"}>
          <Stack.Screen name={"dashboard"} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
