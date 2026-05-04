import { useNavigation, usePathname, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  Text,
  XStack,
  YStack,
  Separator,
  Avatar,
  View,
  SizableText,
  Popover,
  Accordion,
  Paragraph,
  Square,
  ScrollView,
} from "tamagui";
import { authClient } from "../../lib/authClients";
import {
  Book,
  BookText,
  ChevronDown,
  House,
  Menu,
  Pen,
  AudioLines,
  Mic,
  Settings,
  Headset,
  Newspaper,
  Monitor,
} from "@tamagui/lucide-icons";
import SignoutButton from "../button/signout";
export default function MenuDrawer({ navigation }: any) {
  const { data: session } = authClient.useSession.get();
  const router = useRouter();
  const inset = useSafeAreaInsets();
  const pathname = usePathname();
  const closeDrawer = (url: string) => {
    navigation.dispatch({ type: "TOGGLE_DRAWER" });
    console.log('drawer: ',url)
    if (pathname !== url) {
      router.push(url);
    }
  };
  function PopoverProfile({
    closeDrawer,
  }: {
    closeDrawer: (url: string) => void;
  }) {
    return (
      <Popover stayInFrame allowFlip>
        <Popover.Trigger asChild marginLeft={"auto"}>
          <Button icon={Menu} backgroundColor={"$colorTransparent"} />
        </Popover.Trigger>
        <Popover.Content height={"fit-content"} p={0} px={12}>
          <Popover.Arrow borderWidth={1} borderColor={"$borderColor"} />
          <YStack>
            <SignoutButton
              closeDrawer={closeDrawer}
              transparent={true}
              fromDrawer={true}
            />
          </YStack>
        </Popover.Content>
      </Popover>
    );
  }
  return (
    <ScrollView
      flex={1}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: inset.top + 8,
        paddingBottom: inset.bottom,
        gap: 12,
      }}
    >
      <View
        width={"100%"}
        borderWidth={0}
        padding={12}
        borderBottomWidth={1}
        borderColor={"$borderColor"}
      >
        <Text fontSize={"$5"} textTransform="uppercase">MuniToefl</Text>
      </View>
      <View flex={1} paddingHorizontal={20} gap={10} alignItems={"flex-start"}>
        <Button
          onPress={() => {
            closeDrawer("/");
          }}
          icon={House}
          iconSize={32}
          paddingHorizontal={0}
          backgroundColor={"$colorTransparent"}
        >
          Home
        </Button>
        <Accordion overflow="hidden" width={"100%"} type="single" collapsible>
          <Accordion.Item value="lesson" mb={-1}>
            <Accordion.Trigger
              flexDirection="row"
              justifyContent="space-between"
              backgroundColor={"$colorTransparent"}
              borderWidth={0}
              paddingLeft={0}
              pressStyle={{ backgroundColor: "$colorTransparent" }}
            >
              {({ open }: { open: boolean }) => (
                <>
                  <View
                    flex={1}
                    flexDirection="row"
                    gap={6}
                    alignItems="center"
                  >
                    <Book size={16} />
                    <Paragraph>Lesson</Paragraph>
                  </View>
                  <Square
                    transparent
                    transition="quick"
                    rotate={open ? "180deg" : "0deg"}
                  >
                    <ChevronDown size="$1" color="$color" />
                  </Square>
                </>
              )}
            </Accordion.Trigger>
            <Accordion.HeightAnimator
              transition="quick"
              exitStyle={{ opacity: 0 }}
              borderRightWidth={0}
              borderTopWidth={0}
              borderLeftWidth={1}
              borderColor="$borderColor"
            >
              <Accordion.Content backgroundColor={"$colorTransparent"}>
                <YStack gap={10} alignItems="flex-start">
                  <Button
                  onPress={()=>router.navigate('/lesson?type=writing')}
                    backgroundColor={"$colorTransparent"}
                    paddingLeft={0}
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderColor={"$borderColor"}
                    iconSize={32}
                    icon={Pen}
                  >
                    Writing
                  </Button>
                  <Button
                  onPress={()=>router.navigate('/lesson?type=listening')}
                    backgroundColor={"$colorTransparent"}
                    paddingLeft={0}
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderColor={"$borderColor"}
                    iconSize={32}
                    icon={AudioLines}
                  >
                    Listening
                  </Button>
                  <Button
                  onPress={()=>router.navigate('/lesson?type=reading')}
                    backgroundColor={"$colorTransparent"}
                    paddingLeft={0}
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderColor={"$borderColor"}
                    iconSize={32}
                    icon={BookText}
                  >
                    Reading
                  </Button>
                  <Button
                  onPress={()=>router.navigate('/lesson?type=speaking')}
                    backgroundColor={"$colorTransparent"}
                    paddingLeft={0}
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderColor={"$borderColor"}
                    iconSize={32}
                    icon={Mic}
                  >
                    Speaking
                  </Button>
                </YStack>
              </Accordion.Content>
            </Accordion.HeightAnimator>
          </Accordion.Item>
        </Accordion>
        <Button
          marginBottom={12}
          iconSize={32}
          backgroundColor={"$colorTransparent"}
          paddingLeft={0}
          icon={Newspaper}
        >
          Blog
        </Button>
        {session?.user.role !== "admin" ? (
          <>
            <Button
              onPress={() => {
                closeDrawer("/client/dashboard/home");
              }}
              marginBottom={12}
              iconSize={32}
              backgroundColor={"$colorTransparent"}
              paddingLeft={0}
              icon={Monitor}
            >
              Dashboard
            </Button>
            <Separator
              marginBottom={12}
              borderWidth={1}
              width={"100%"}
              borderColor={"$borderColor"}
            />
            <YStack gap={10} alignItems="flex-start">
              <Button
                marginBottom={12}
                iconSize={32}
                backgroundColor={"$colorTransparent"}
                paddingLeft={0}
                icon={Settings}
              >
                Setting and Privacy
              </Button>
              <Button
                marginBottom={12}
                iconSize={32}
                backgroundColor={"$colorTransparent"}
                paddingLeft={0}
                icon={Headset}
              >
                Help center
              </Button>
            </YStack>
          </>
        ) : (
          <Button
            onPress={() => {
              closeDrawer("/admin/dashboard");
            }}
          >
            <Text>Admin Dashboard</Text>
          </Button>
        )}
        <YStack
          marginTop={"auto"}
          style={{ justifySelf: "flex-end", alignSelf: "flex-end" }}
          width={"100%"}
          p={8}
          gap={6}
        >
          {!!session?.session&&(
            <>
          <Separator alignSelf="stretch" />
          <XStack gap={10} flex={1} justifyContent="center">
            <View
              rounded={"100%"}
              backgroundColor={"$accent4"}
              width={40}
              height={40}
            ></View>
            <YStack justifyContent="center">
              <SizableText fontSize={"$1"}>{session?.user.name}</SizableText>
              <Text fontSize={"$1"} color={"$white08"}>
                {session?.user.role !== "admin" ? "Student" : "Admin"}
              </Text>
            </YStack>
            <PopoverProfile closeDrawer={closeDrawer} />
          </XStack>
        </>)}
        </YStack>
      </View>
    </ScrollView>
  );
}
