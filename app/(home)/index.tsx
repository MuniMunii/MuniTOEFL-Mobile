import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "tamagui";
import LoginListModal from "../components/sheet/Loginmodal";
// import { Button, Text, View } from "react-native";

export default function HomePages(){
    const router=useRouter()
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Home Page</Text>
            {/* <Button  onPress={()=>router.navigate('/client/auth/login')}>Login</Button> */}
            {/* <LoginListModal/> */}
            <Button  onPress={()=>router.navigate('/client/dashboard/home')}>Check session</Button>
            <StatusBar style="auto" />
        </View>
    )
}