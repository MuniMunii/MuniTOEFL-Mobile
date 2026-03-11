import { Button, Form, Text, Theme, View, XStack, YStack } from "tamagui";
import { useRouter } from "expo-router";
import GoogleSignIn from "../../../../components/button/googleSignIn";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InputWithLabel from "../../../../components/form/inputWithLabel";
import { useState } from "react";
import { authClient } from "../../../../lib/authClients";
import { z } from "zod";
import { MessageSquareWarning } from "@tamagui/lucide-icons";
import { Paragraph } from "tamagui";
import { H1 } from "tamagui";
import { H2 } from "tamagui";
export default function LoginTabs() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{
    isError: boolean;
    message: string | undefined;
  }>({ isError: false, message: "" });
  const router = useRouter();
  const inset = useSafeAreaInsets();
  async function handleSubmit() {
    try{
    console.log('hit')
    await authClient.signIn.email(
      { email, password },
      {
        onSuccess:async ()=>{
          console.log('login success')
// const session = await authClient.getSession();
// console.log(session)
//         if (session.data?.session) {
          router.replace('/client/dashboard');
        },
        onError: (err) => {
          return setError({ isError: !!err, message: err.error.message });
        },
      },
    );
  }
    catch(err){console.log(err)}
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
        <Theme name={"error"}>
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
              {error.message ? error.message : "Error, please try again later"}
            </Paragraph>
          </XStack>
        </Theme>
        <View>
          <Form onSubmit={handleSubmit}>
            <InputWithLabel
              placeholder="email@gmail.com"
              label="Email"
              value={email}
              setValue={setEmail}
            />
            <InputWithLabel
              placeholder="*********"
              label="Password"
              value={password}
              setValue={setPassword}
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
