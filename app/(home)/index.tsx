import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, H1, Text, View,Paragraph } from "tamagui";
import { Typograpy } from "../../constant/typography";
// import { Button, Text, View } from "react-native";

export default function HomePages(){
    const router=useRouter()
    return (
        <View flex={1} mt={12}>
            <H1 fontSize={24}>Welcome to Muni-Toefl</H1>
            <Paragraph  fontFamily={'$body'} fontWeight={'$bold'}>Enjoy learning, and Reach Goal!</Paragraph>
                        <Paragraph style={{fontFamily:'Outfit-Bold'}}>Enjoy learning, and Reach Goal!, {Typograpy.fontFamily.regular}</Paragraph>

        </View>
    )
}