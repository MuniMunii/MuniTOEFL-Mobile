import { useNavigation, useRouter } from "expo-router";
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
import { ChevronDown, Menu } from "@tamagui/lucide-icons";
import SignoutButton from "../button/signout";
export default function MenuDrawer({ navigation }: any) {
  const { data: session } = authClient.useSession.get();
  const router = useRouter();
  const inset = useSafeAreaInsets();
  const closeDrawer = (url: string) => {
    navigation.dispatch({ type: "TOGGLE_DRAWER" });
    router.push(url);
  };
  function PopoverProfile({closeDrawer}:{closeDrawer:(url:string)=>void}) {
    return (
      <Popover stayInFrame allowFlip>
        <Popover.Trigger asChild marginLeft={"auto"}>
          <Button icon={Menu} backgroundColor={"$colorTransparent"} />
        </Popover.Trigger>
        <Popover.Content height={"fit-content"} p={0} px={12}>
          <Popover.Arrow borderWidth={1} borderColor={"$borderColor"} />
          <YStack>
            <SignoutButton closeDrawer={closeDrawer} transparent={true} fromDrawer={true}/>
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
        paddingHorizontal: 20,
        paddingTop: inset.top + 8,
        paddingBottom: inset.bottom,
        gap:10
      }}
    >
      <Button
        onPress={() => {
          closeDrawer("/");
        }}
      >
        <Text>Home</Text>
      </Button>
      <Accordion overflow="hidden" width={"100%"} type="single" collapsible>
        <Accordion.Item value="lesson" mb={-1}>
          <Accordion.Trigger
            flexDirection="row"
            justifyContent="space-between"
            borderWidth={1}
          >
            {({ open }: { open: boolean }) => (
              <>
                <Paragraph>Lesson</Paragraph>
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
            borderWidth={1}
            borderTopWidth={0}
            borderColor="$borderColor"
          >
            <Accordion.Content>
              <YStack gap={10}>
                <Button>Writing</Button>
                <Button>Listening</Button>
                <Button>Reading</Button>
                <Button>Speaking</Button>
              </YStack>
            </Accordion.Content>
          </Accordion.HeightAnimator>
        </Accordion.Item>
      </Accordion>
      <Button>Blog</Button>
      {session?.user.role !== "admin" ? (
        <>
          <Button
            onPress={() => {
              closeDrawer("/client/dashboard");
            }}
            marginBottom={12}
          >
            <Text>Dashboard</Text>
          </Button>
          <Separator
            marginBottom={12}
            borderWidth={1}
            width={'100%'}
            borderColor={"$borderColor"}
          />
          <YStack gap={10}>
            <Button>
              <Text>Setting and Privacy</Text>
            </Button>
            <Button>
              <Text>Help Center</Text>
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
        <Separator alignSelf="stretch" />
        <XStack gap={10} flex={1} justifyContent="center">
          <View
            rounded={"100%"}
            backgroundColor={"$accent4"}
            width={40}
            height={40}
          ></View>
          <SizableText fontSize={"$1"}>{session?.user.name}</SizableText>
          <PopoverProfile closeDrawer={closeDrawer}/>
        </XStack>
      </YStack>
    </ScrollView>
  );
}
