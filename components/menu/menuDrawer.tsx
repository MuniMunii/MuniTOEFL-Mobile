import { useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Text, XStack, YStack, Separator, Avatar, View,SizableText, Popover } from "tamagui";
import { authClient } from "../../lib/authClients";
import { Menu } from "@tamagui/lucide-icons";
import SignoutButton from "../button/signout";
export default function MenuDrawer({ navigation }: any) {
  const { data: session } = authClient.useSession.get();
  const router = useRouter();
  const inset = useSafeAreaInsets();
  const closeDrawer = (url: string) => {
    navigation.dispatch({ type: "TOGGLE_DRAWER" });
    router.push(url);
  };
  function PopoverProfile(){
    return (
        <Popover stayInFrame allowFlip>
            <Popover.Trigger asChild marginLeft={'auto'}>
                <Button icon={Menu} backgroundColor={'$colorTransparent'}/>
            </Popover.Trigger>
            <Popover.Content>
                <Popover.Arrow borderWidth={1} borderColor={'$borderColor'}/>
                <YStack>
                    <Button backgroundColor={'$colorTransparent'}>Profile</Button>
                    <Separator/>
                    <SignoutButton transparent={true}/>
                </YStack>
            </Popover.Content>
        </Popover>
    )
  }
  return (
    <YStack
      flex={1}
      paddingHorizontal={20}
      alignItems="flex-start"
      paddingTop={inset.top + 8}
      paddingBottom={inset.bottom}
    >
      <Button
        onPress={() => {
          closeDrawer("/");
        }}
      >
        <Text>Home</Text>
      </Button>

      <Button
        onPress={() => {
          closeDrawer("/client/dashboard");
        }}
      >
        <Text>Client Dashboard</Text>
      </Button>

      <Button
        onPress={() => {
          closeDrawer("/admin/dashboard");
        }}
      >
        <Text>Admin Dashboard</Text>
      </Button>
      {/* i want this stack in the bottom without using flex 1 like items-self=fle */}
      <YStack
        marginTop={'auto'}
        style={{ justifySelf: "flex-end" }}
        width={'100%'}
        p={8}
        gap={6}
      >
        <Separator  alignSelf="stretch" />
        <XStack gap={10} flex={1} justifyContent="center">
          {/* <Avatar circular size="$3">
                <Avatar.Image src="" backgroundColor={'$accent10'}/>
                <Avatar.Fallback/>
            </Avatar> */}
          <View
            rounded={"100%"}
            backgroundColor={"$accent4"}
            width={40}
            height={40}
          ></View>
          <SizableText fontSize={'$1'}>
            {session?.user.name}
          </SizableText>
          <PopoverProfile/>
        </XStack>
      </YStack>
    </YStack>
  );
}
