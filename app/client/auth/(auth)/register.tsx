import { useRouter } from "expo-router";
import { Button, Text, View } from "tamagui";
import GoogleSignIn from "../../../components/button/googleSignIn";

export default function RegisterTabs() {
  const router = useRouter();
  return (
    <View flex={1}>
      <Text>hello register</Text>
      <GoogleSignIn />
      <Button onPress={() => router.navigate("/client/auth/login")}>
        Already have account? Login Here
      </Button>
    </View>
  );
}
