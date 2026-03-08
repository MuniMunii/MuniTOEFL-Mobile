import { Slot,Redirect, Tabs } from "expo-router";
import { authClient } from "../../lib/authClients";
import { Text } from "tamagui";
export default function DashboardLayout(){
    const {data:session,isPending,error}=authClient.useSession.get()
    if(isPending)return <Text>Loading</Text>;
    if(!session)return <Redirect href='/client/auth/login'/>
    return (
        <Slot/>
    )
}