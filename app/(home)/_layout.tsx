import { Slot, Tabs } from "expo-router";
import BottomNavbar from "../components/navigation/bottomNav";
import { View } from "tamagui";
export default function HomeLayout(){
    return <>
    <Tabs screenOptions={{headerShown:false,tabBarStyle:{display:'none'}}}>
        <Tabs.Screen name="index"/>
    </Tabs>
    <BottomNavbar/>
    </>
}