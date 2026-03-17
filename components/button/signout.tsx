import { useRouter } from "expo-router";
import { Button } from "tamagui";
import { authClient } from "../../lib/authClients";

export default function SignoutButton({transparent=false}:{transparent?:boolean}){
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
        <Button backgroundColor={transparent?'$colorTransparent':'$borderColor'} onPress={handleSignout}>Logout</Button>
    )
}