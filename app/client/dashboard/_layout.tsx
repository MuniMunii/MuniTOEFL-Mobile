import { Slot,Redirect, Tabs, useRouter } from "expo-router";
import { authClient } from "../../../lib/authClients";
import { Text } from "tamagui";
import { useEffect } from "react";
export default function DashboardLayout(){
    const {data:session,isPending,error}=authClient.useSession.get()
    if(isPending)return <Text>Loading</Text>;
    return (
        <Slot/>
    )
}