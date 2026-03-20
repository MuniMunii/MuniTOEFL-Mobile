import { Slot, Tabs } from "expo-router";

export default function AuthLayout(){
    return (
        <>
        <Tabs screenOptions={{tabBarStyle:{display:'none'},headerShown:false}}>
            <Tabs.Screen name="login"/>
            <Tabs.Screen name="register"/>
        </Tabs>
        </>
    )
}