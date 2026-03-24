import { useNavigation, useRouter } from "expo-router";
import { Button } from "tamagui";
import { authClient } from "../../lib/authClients";

export default function SignoutButton({transparent=false,fromDrawer=false}:{transparent?:boolean,fromDrawer?:boolean}){
         const router=useRouter()
         const navigation=useNavigation()
           const closeDrawer = (url: string) => {
            if(fromDrawer){
    navigation.dispatch({ type: "TOGGLE_DRAWER" });
            }
    router.push(url);
  };
     const handleSignout=async ()=>{
        const signOutClient=await authClient.signOut()
        if(signOutClient.error){
        console.log(signOutClient.error)
        }
        console.log(signOutClient)
        closeDrawer('/')
     }
    return(
        <Button backgroundColor={transparent?'$colorTransparent':'$borderColor'} onPress={handleSignout}>Logout</Button>
    )
}