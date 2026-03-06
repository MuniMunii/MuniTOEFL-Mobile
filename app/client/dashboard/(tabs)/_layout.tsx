import { Slot,Redirect } from "expo-router";
import { authClient } from "../../../lib/authClients";
import { Text } from "tamagui";
import { useEffect, useState } from "react";
export default function DashboardLayout(){
    const {data:session,isPending,error}=authClient.useSession.get()
    if(isPending)return <Text>Loading</Text>;
    if(!session)return <Redirect href='/client/auth/login'/>
    return (
        <Slot/>
    )
}