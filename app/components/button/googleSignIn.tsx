import { router } from "expo-router";
import { authClient } from "../../lib/authClients";
import { Button } from "tamagui";
import { useEffect } from "react";
export default function GoogleSignIn() {
    const handleLogin = async () => {
        const { error,data } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "myapp://"
        })
        if (error) {
            // handle error
            console.log(error)
            return;
        }
        if(data){
            router.replace("/client/dashboard/home");
        }
    };
      const { data: session } = authClient.useSession.get();
  useEffect(() => {
    if (session) {
      router.replace("/client/dashboard/home");
    }
  }, [session]);
    return <Button onPress={handleLogin}>Login with Google</Button>;
}