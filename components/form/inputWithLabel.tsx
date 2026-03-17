import { SetStateAction, useState } from "react";
import {
  Button,
  Label,
  Paragraph,
  SizableText,
  Text,
  Theme,
  View,
  XStack,
  YStack,
} from "tamagui";
import { Input } from "tamagui";
import {MessageSquareWarning}from "@tamagui/lucide-icons"
import { RegisterType } from "../../types/Auth";
type FieldError = {
  errorMsg: string;
  isError: boolean;
};
export default function InputWithLabel<T>({
  value,
  setValue,
  label,
  password = false,
  focusOnMount = false,
  placeholder='Input here...',
  error,
  field,
}: {
  error?: FieldError;
  focusOnMount?: boolean;
  password?: boolean;
  label: string;
  value: string;
  field:string;
  placeholder:string;
  setValue: React.Dispatch<SetStateAction<T>>;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(password);
  return (
    <YStack gap={2}>
      <Label fontWeight={"$extraLight"} mb={'$-2'}>{label}</Label>
      {error?.isError&&
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
            {error.errorMsg}
          </Paragraph>
        </XStack>
      </Theme>}
      <Input
      placeholderTextColor={'$white06'}
        autoFocus={focusOnMount}
        onChangeText={(text)=>{
        // console.log(`${field}:${text}`);
        setValue((prev)=>({...prev,[field]:text}))}}
        value={value}
        secureTextEntry={showPassword}
        placeholder={placeholder}
        borderColor={error?'$red6':'$borderColor'}
      />
      {password && (
        <Button
          alignSelf="flex-start"
          size={"$1"}
          width={"fit-content"}
          bg={"$colorTransparent"}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Show password" : "Hide password"}
        </Button>
      )}
    </YStack>
  );
}
