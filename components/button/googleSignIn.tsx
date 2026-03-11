import { Redirect, router } from "expo-router";
import { authClient } from "../../lib/authClients";
import { Button } from "tamagui";
import {  useState } from "react";
import LoginWithCredentials from "./loginWithCredentials";
export default function GoogleSignIn({
  setOpen,
  fromModal,
}: {
  setOpen?: any;
  fromModal: boolean;
}) {
  const { data: session } = authClient.useSession.get();
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const handleLogin = async () => {
    try{
    if (session) {
      console.log("You are already logged in");
      return;
    }
    setOpen(false);
    setIsLoading(true)
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      fetchOptions: {
        headers: { "ngrok-skip-browser-warning": "true" },
      },
    });
    if (error) {
      // handle error
      setIsLoading(false)
      throw new Error(error.message)
    }
    const client = await authClient.getSession();
    // console.log(client)
    if (client.data?.session) {
          setIsLoading(false)
      router.replace("/client/dashboard/home");
    }}catch(err){
      console.log(err)
    }
  };
  if (session) {
    return <Redirect href={"/client/dashboard/home"} />;
  }
  return (<>
    <Button onPress={handleLogin} width={fromModal ? "100%" : "fit"} disabled={isLoading}>
      Login with Google
    </Button>
    {fromModal&&<LoginWithCredentials isLoading={isLoading} setOpen={setOpen}/>}
    </>
  );
}
