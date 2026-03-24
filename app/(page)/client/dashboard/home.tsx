import { Text, Button, YStack, XStack, ScrollView } from "tamagui";
import { authClient } from "../../../../lib/authClients";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GraphProgress from "../../../../components/card/client/graphProgress";
import { Pen } from "@tamagui/lucide-icons";
import { useState } from "react";
import EditUsername from "../../../../components/sheet/editUsername";
export default function ClientDashboard() {
  const { data: session } = authClient.useSession.get();
  const [openEditUsername,setOpenEditUsername]=useState<boolean>(false)
//   for optimistic update after update
  const [username,setUsername]=useState(session?.user.name??'User')
  const inset = useSafeAreaInsets();
  return (<>
  <EditUsername open={openEditUsername} setOpen={setOpenEditUsername} setUsername={setUsername}/>
    <ScrollView
      flex={1}
      contentContainerStyle={{
        paddingBottom: inset.bottom,
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      <XStack
        paddingVertical={6}
        paddingHorizontal={12}
        justifyContent="space-between"
        alignItems={"center"}
        marginVertical={12}
      >
        <YStack maxWidth={"85%"}>
          <Text fontSize={"$1"} color={"$white08"}>
            Welcome back,
          </Text>
          <Text fontSize={"$4"}>
            {username}
          </Text>
        </YStack>
        <Button
          icon={Pen}
          circular
          size={42}
          iconSize={24}
          alignItems="center"
          justifyContent="center"
          onPress={()=>{console.log('hit');setOpenEditUsername(true)}}
        />
      </XStack>
      <YStack gap={16}>
        <XStack gap={16}>
          <GraphProgress type="writing" />
          <GraphProgress type="reading" />
        </XStack>
        <XStack gap={16}>
          <GraphProgress type="speaking" />
          <GraphProgress type="listening" />
        </XStack>
      </YStack>
    </ScrollView>
    </>
  );
}
