import { Stack } from "expo-router";
import BottomNavbar from "../components/navigation/bottomNav";

export default function ClientLayout(){
    return (
    <>
        <Stack screenOptions={{presentation:'transparentModal',headerShown:false}}>
            <Stack.Screen name="auth/(auth)"></Stack.Screen>
        </Stack>
        </>
    )

}