import { Button, Form, Text, Theme, View, XStack, YStack } from "tamagui";
import { useRouter } from "expo-router";
import GoogleSignIn from "../../../../../components/button/googleSignIn";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InputWithLabel from "../../../../../components/form/inputWithLabel";
import { useState } from "react";
import { authClient } from "../../../../../lib/authClients";
import { MessageSquareWarning } from "@tamagui/lucide-icons";
import { Paragraph } from "tamagui";
import { H2 } from "tamagui";
import { LoginType } from "../../../../../types/Auth";
export default function LoginTabs() {
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [formValue,setFormValue]=useState<LoginType>({
    email:'',
    password:""
  })
  const [error, setError] = useState<{
    isError: boolean;
    message: string | undefined;
  }>({ isError: false, message: "" });
  const router = useRouter();
  const inset = useSafeAreaInsets();
  async function handleSubmit() {
    try {
      console.log("hit");
      await authClient.signIn.email(
        { email:formValue.email, password:formValue.password },
        {
          onSuccess: async () => {
            setError((prev)=>({...prev, isError: false}))
          },
          onError: (err) => {
            return setError({ isError: true, message: err.error.message });
          },
        },
      );
      const client = await authClient.getSession();
      console.log(client);
      if (client.data?.session) {
        if(client.data.user.role!=='admin'){
        router.replace("/client/dashboard/home");
        }
        router.replace("/admin/dashboard/home")
      }
    } catch (err) {
          return setError({ isError: true, message: 'Error getting session, please try again later' });
    }
  }
  return (
    <YStack
      pt={inset.top + 8}
      pb={inset.bottom + 12}
      flex={1}
      justify={"center"}
      items={"center"}
    >
      <YStack
        border="1px solid"
        bg={"$red1"}
        borderColor={"$accent10"}
        width={"90%"}
        maxWidth={"500px"}
        rounded={20}
        paddingVertical={26}
        paddingHorizontal={18}
        gap={6}
      >
        <H2 alignSelf="center">Login</H2>
{ error.isError&&<Theme name={"error"}>
          <XStack
            mb={5}
            bg={"$red3"}
            width={"100%"}
            paddingVertical={"$2.5"}
            paddingHorizontal={"$3"}
            border="1px solid"
            borderColor={"$red8"}
            rounded={"$2"}
            items={"center"}
            justify={"flex-start"}
            gap="$2"
          >
            <MessageSquareWarning />
            <Paragraph flexShrink={1} textAlign="justify">
              {error.message}
            </Paragraph>
          </XStack>
        </Theme>}
        <View>
          <Form onSubmit={handleSubmit}>
            <InputWithLabel
              placeholder="email@gmail.com"
              label="Email"
              field="email"
              value={formValue.email}
              setValue={setFormValue}
            />
            <InputWithLabel
              placeholder="*********"
              field="password"
              label="Password"
              value={formValue.password}
              setValue={setFormValue}
              password={true}
            />
            <Form.Trigger asChild>
              <Button type="submit">Login</Button>
            </Form.Trigger>
          </Form>
        </View>
        <GoogleSignIn fromModal={false} />
        <Button onPress={() => router.navigate("/client/auth/register")}>
          Dont have account? Register Here
        </Button>
        <Button onPress={() => router.navigate("/")}>Home</Button>
      </YStack>
    </YStack>
  );
}
