import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";

export default function HomePages(){
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Home Page</Text>
            <Button title="Hello"/>
            <StatusBar style="auto" />
        </View>
    )
}