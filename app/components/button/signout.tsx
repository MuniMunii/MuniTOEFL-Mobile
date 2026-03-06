import { useRouter } from "expo-router";
import { Button } from "tamagui";
import { authClient } from "../../lib/authClients";

export default function SignoutButton(){
         const router=useRouter()
     const handleSignout=async ()=>{
        const signOutClient=await authClient.signOut()
        if(signOutClient.error){
        console.log(signOutClient.error)
        }
        if(signOutClient.data){
            router.replace("/client/auth/login")
        }
     }
    return(
        <Button onPress={handleSignout}>Logout</Button>
    )
}