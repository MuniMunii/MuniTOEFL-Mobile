import { Redirect, router } from "expo-router";
import { authClient } from "../../lib/authClients";
import { Button } from "tamagui";
import { useEffect } from "react";
export default function GoogleSignIn() {
    const { data: session } = authClient.useSession.get();
    const handleLogin = async () => {
        if(session){
        console.log('You are already logged in')
        return}
        console.log('start')
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
            fetchOptions:{
                headers:{"ngrok-skip-browser-warning": "true"}
            }
        })
        if (error) {
            // handle error
            console.log(error)
            return;
        }
        const client=await authClient.getSession()
        // console.log(client)
        if(client.data?.session){
            router.replace("/client/dashboard/home");
        }
    };
  if(session){
    return <Redirect href={'/client/dashboard/home'}/>
  }
    return <Button onPress={handleLogin}>Login with Google</Button>;
}