import { Slot, Tabs } from "expo-router";
import { View } from "tamagui";
import BottomNavbar from "../../components/navigation/bottomNav";
export default function HomeLayout(){
    return <>
    <Tabs screenOptions={{headerShown:false,tabBarStyle:{display:'none'}}}>
        <Tabs.Screen name="index"/>
    </Tabs>
    <BottomNavbar/>
    </>
}