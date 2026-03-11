import { useRouter } from "expo-router";
import { Button, Text, View, XStack, YStack } from "tamagui";
import GoogleSignIn from "../../../../components/button/googleSignIn";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { H2 } from "tamagui";
import { Theme } from "tamagui";
import { MessageSquareWarning } from "@tamagui/lucide-icons";
import { Paragraph } from "tamagui";
import { Form } from "tamagui";
import InputWithLabel from "../../../../components/form/inputWithLabel";
import { authClient } from "../../../../lib/authClients";
import { useState } from "react";

export default function RegisterTabs() {
    const [email,setEmail]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const [error,setError]=useState<{isError:boolean,message:string|undefined}>({isError:false,message:''})
    const router = useRouter();
    const inset=useSafeAreaInsets()
    async function onSubmit(){
      const {data,error}=await authClient.signIn.email({email,password})
      if(error){
        return setError({isError:!!error,message:error.message})
      }
      return data
    }
  return (
    <YStack pt={inset.top+8} pb={inset.bottom+12} flex={1} justify={'center'} items={'center'}>
    <YStack border="1px solid" bg={'$red1'} borderColor={'$accent10'} width={'90%'} maxWidth={'500px'} rounded={20} paddingVertical={26} paddingHorizontal={18} gap={6}>
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
                items={'center'}
                justify={'flex-start'}
                gap="$2"
              >
                  <MessageSquareWarning/>
                <Paragraph flexShrink={1} textAlign="justify">
                  {error.message?error.message:'Error, please try again later'}
                </Paragraph>
              </XStack>
            </Theme>
      <View>
        <Form>
        <InputWithLabel placeholder="email@gmail.com" label="Email" value={email} setValue={setEmail}/>
        <InputWithLabel placeholder="*********" label="Password" value={password} setValue={setPassword} password={true}/>
        </Form>
      </View>
      <GoogleSignIn fromModal={false}/>
      <Button onPress={() => router.navigate("/client/auth/register")}>
        Dont have account? Register Here
      </Button>
      <Button onPress={() => router.navigate("/")}>Home</Button>
    </YStack>
    </YStack>
  );
}
