import { Stack, useRouter } from "expo-router";
import { authClient } from "../../lib/authClients";
import { useEffect } from "react";

export default function ClientLayout(){
    const {data:session,isPending}=authClient.useSession.get()
        const router=useRouter()
        // problem the dashboard has a null session and need to refresh and not automated store the session after login with email
      useEffect(()=>{
        console.log(isPending)
        console.log(session)
        async function fetchSession(){
            const client=await authClient.getSession()
            console.log(client)
        }
        fetchSession()
    //     async function fetchSession(){
    //       if(!isPending){
    //         const client=await authClient.getSession()
    //         console.log(session)
    //         if(client.data?.session){
    //             console.log(client)
    //             return
    //         }
    //         else{
    //             router.push('/client/auth/login')
    //         }
    //       }
    //       return
    //     }
    //   fetchSession()
      },[isPending,session])
    return (
    <>
        <Stack screenOptions={{presentation:'transparentModal',headerShown:false}}>
            <Stack.Screen name="auth/(auth)"></Stack.Screen>
                      <Stack.Protected guard={!!session}>
                        <Stack.Screen name={'dashboard'}/>
                      </Stack.Protected>
        </Stack>
        </>
    )

}