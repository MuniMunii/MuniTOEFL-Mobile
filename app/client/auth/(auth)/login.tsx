import { Button, Text, View } from "tamagui";
import GoogleSignIn from "../../../components/button/googleSignIn";
import { useRouter } from "expo-router";

export default function LoginTabs() {
  const router = useRouter();
  return (
    <View flex={1}>
      <Text>hello login</Text>
      <GoogleSignIn />
      <Button onPress={() => router.navigate("/client/auth/register")}>
        Dont have account? Register Here
      </Button>
      <Button onPress={() => router.navigate("/")}>Home</Button>
    </View>
  );
}
