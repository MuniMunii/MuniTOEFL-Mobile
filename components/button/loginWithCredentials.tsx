import { useRouter } from "expo-router";
import { SetStateAction } from "react";
import{Button}from"tamagui"
export default function LoginWithCredentials({
  setOpen,
  isLoading
}: {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  isLoading?:boolean;
}){
    const router=useRouter();
    return (<Button width={"100%"} onPress={()=>{router.navigate('/client/auth/login');setOpen(false)}} disabled={isLoading}>Login with email and password</Button>)

}