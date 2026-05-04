import { useRouter } from "expo-router";
import { Button, ScrollView, Text, View, XStack, YStack } from "tamagui";
import GoogleSignIn from "../../../../../components/button/googleSignIn";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { H2 } from "tamagui";
import { Theme } from "tamagui";
import { MessageSquareWarning } from "@tamagui/lucide-icons";
import { Paragraph } from "tamagui";
import { Form } from "tamagui";
import InputWithLabel from "../../../../../components/form/inputWithLabel";
import { authClient } from "../../../../../lib/authClients";
import { useEffect, useState } from "react";
import { RegisterScheme, RegisterType } from "../../../../../types/Auth";
type FieldError = {
  errorMsg: string;
  isError: boolean;
};

export default function RegisterTabs() {
  const [formValue, setFormValue] = useState<RegisterType>({
    confirmPassword: "",
    email: "",
    noTelp: "",
    password: "",
    username: "",
  });
  const [errorField, setErrorField] = useState<
    Partial<Record<keyof RegisterType, FieldError>>
  >({});
  const [errorFetch, setErrorFetch] = useState<{
    message: string;
    isError: boolean;
  }>({
    message: "",
    isError: false,
  });
  const router = useRouter();
  const inset = useSafeAreaInsets();
  async function handleSubmit() {
    try {
      const safeParse = RegisterScheme.safeParse(formValue);
      if (!safeParse.success) {
        const fieldErrors = safeParse.error.flatten().fieldErrors;
        const formattedErrors: Partial<Record<keyof RegisterType, FieldError>> =
          {};
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          if (messages && messages.length > 0) {
            formattedErrors[field as keyof RegisterType] = {
              errorMsg: messages[0],
              isError: true,
            };
          }
        });
        setErrorField(formattedErrors);
        console.log(formattedErrors);
        return;
      }
      await authClient.signUp.email(
        {
          name: formValue.username,
          email: formValue.email,
          password: formValue.password,
          image: "",
          noTelp: formValue.noTelp,
        },
        {
          onError: (error) => {
            return setErrorFetch({
              isError: !!error,
              message: error.error.message,
            });
          },
          
          onSuccess: () => {
            setFormValue({
              confirmPassword: "",
              password: "",
              email: "",
              noTelp: "",
              username: "",
            });
            setErrorFetch({ isError: false, message: "" });
            setErrorField({});
            router.replace("/client/auth/login");
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    console.log(formValue);
  }, [formValue]);
  return (
    <YStack
      pt={8}
      pb={inset.bottom + 12}
      flex={1}
      justify={"center"}
      items={"center"}
    >
      <ScrollView width={"90%"} maxWidth={"500px"}>
        <YStack
          border="1px solid"
          bg={"$red1"}
          borderColor={"$accent10"}
          rounded={20}
          paddingVertical={26}
          paddingHorizontal={18}
          gap={6}
        >
          <Text alignSelf="center">Register</Text>
          {errorFetch.isError && (
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
                  {errorFetch.message
                    ? errorFetch.message
                    : "Error, please try again later"}
                </Paragraph>
              </XStack>
            </Theme>
          )}
          <View>
            <Form onSubmit={handleSubmit}>
              <InputWithLabel
                field={"email"}
                placeholder="email@gmail.com"
                label="Email"
                value={formValue.email}
                setValue={setFormValue}
                error={errorField.email}
              />
              <InputWithLabel
                field={"username"}
                placeholder="MuniMuni"
                label="Username"
                value={formValue.username}
                setValue={setFormValue}
                error={errorField.username}
              />
              <InputWithLabel
                field={"noTelp"}
                placeholder="0812383928"
                label="Phone Number"
                value={formValue.noTelp}
                setValue={setFormValue}
                error={errorField.noTelp}
              />
              <InputWithLabel
                field={"password"}
                placeholder="*********"
                label="Password"
                value={formValue.password}
                setValue={setFormValue}
                error={errorField.password}
                password={true}
              />
              <InputWithLabel
                field={"confirmPassword"}
                placeholder="*********"
                label="Confirm Password"
                value={formValue.confirmPassword}
                setValue={setFormValue}
                error={errorField.confirmPassword}
                password={true}
              />
              <Form.Trigger asChild mt={12}>
                <Button type="submit">Register</Button>
              </Form.Trigger>
            </Form>
          </View>
          <GoogleSignIn fromModal={false} />
          <Button onPress={() => router.navigate("/client/auth/login")}>
            Already have account?, Login here
          </Button>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
