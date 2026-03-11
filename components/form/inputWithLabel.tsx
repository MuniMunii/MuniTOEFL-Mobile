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
export default function InputWithLabel({
  value,
  setValue,
  label,
  password = false,
  focusOnMount = false,
  placeholder='Input here...',
  error,
  errorMsg,
}: {
  error?: boolean;
  errorMsg?: string | undefined;
  focusOnMount?: boolean;
  password?: boolean;
  label: string;
  value: string;
  placeholder:string;
  setValue: React.Dispatch<SetStateAction<string>>;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(password);
  return (
    <YStack gap={2}>
      <Label fontWeight={"$extraLight"} mb={'$-2'}>{label}</Label>
      {error&&
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
            {errorMsg}
          </Paragraph>
        </XStack>
      </Theme>}
      <Input
      placeholderTextColor={'$white06'}
        autoFocus={focusOnMount}
        onChangeText={setValue}
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
