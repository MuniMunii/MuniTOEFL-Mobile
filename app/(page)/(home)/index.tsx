import { useRouter } from "expo-router";
import { Button, H1, Text, ScrollView, Paragraph } from "tamagui";
import { Typograpy } from "../../../constant/typography";
export default function HomePages() {
  const router = useRouter();
  return (
    <ScrollView flex={1} mt={12}>
      <H1 fontSize={24}>Welcome to Muni-Toefl</H1>
      <Paragraph fontFamily={"$body"} fontWeight={"$bold"}>
        Enjoy learning, and Reach Goal!
      </Paragraph>
      <Paragraph style={{ fontFamily: "Outfit-Bold" }}>
        Enjoy learning, and Reach Goal!, {Typograpy.fontFamily.regular}
      </Paragraph>
      <Button onPress={()=>router.replace('/client/auth/login')}>Login</Button>
    </ScrollView>
  );
}
