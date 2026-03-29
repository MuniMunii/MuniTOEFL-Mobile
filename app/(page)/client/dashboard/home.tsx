import { Text, Button, YStack, XStack, ScrollView, View } from "tamagui";
import { authClient } from "../../../../lib/authClients";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GraphProgress from "../../../../components/card/client/graphProgress";
import { Book, BookX, Pen, XCircle } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import EditUsername from "../../../../components/sheet/editUsername";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../../lib/apiClient";
import { SkeletonProvider,Skeleton } from "../../../../components/skeleton";
import {  useRouter } from "expo-router";
interface ActiveSessionProps {
  title: string;
  titleSug: string;
  type: "in_progress" | "expired" | "submitted";
}
export default function ClientDashboard() {
  const { data: session } = authClient.useSession.get();
  const cookies=authClient.getCookie();
  const [openEditUsername, setOpenEditUsername] = useState<boolean>(false);
  //   for optimistic update after update
  const [username, setUsername] = useState(session?.user.name ?? "User");
  const inset = useSafeAreaInsets();
  const {
    data: activeSessionTest,
    error: activeSessionError,
    isLoading: activeSessionLoading,
  } = useQuery<ActiveSessionProps[]>({
    queryKey: ["all-active-session"],
    queryFn: async () => {
      const res = await apiClient.get(
        `${process.env.EXPO_PUBLIC_NGROK ?? "localhost:3000"}/api/test-attempt/tests/active-session`,
        {headers:{
          "Cookie":cookies
        }}
      );
      return res.data.data;
    },
  });
  // Debugging
// useEffect(()=>{console.log(activeSessionTest)},[activeSessionTest])
  return (
    <>
      <EditUsername
        open={openEditUsername}
        setOpen={setOpenEditUsername}
        setUsername={setUsername}
      />
      <ScrollView
        flex={1}
        contentContainerStyle={{
          paddingBottom: inset.bottom,
          flexGrow: 1,
          flexDirection: "column",
          gap:12
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
            <Text fontSize={"$4"}>{username}</Text>
          </YStack>
          <Button
            icon={Pen}
            circular
            size={42}
            iconSize={24}
            alignItems="center"
            justifyContent="center"
            onPress={() => {
              console.log("hit");
              setOpenEditUsername(true);
            }}
          />
        </XStack>
        <YStack>
          <Text 
          alignSelf="flex-start"
          borderLeftWidth={3}
          borderLeftColor={"$accent11"}
          paddingLeft={12}>Active Session</Text>
        </YStack>
                  <YStack gap={10} p={24} alignItems="center" justifyContent="center" backgroundColor={'$background'} width={'95%'} alignSelf="center" borderRadius={14}>
                    <XStack width={'100%'} p={8} backgroundColor={'$accent9'} borderRadius={10}>
                      <YStack gap={4}>
                      <Text>Listening</Text>
                      <Text></Text>
                      </YStack>
                      <Button onPress={()=>console.log(cookies)}>Continue</Button>
                    </XStack>
          {/* {activeSessionLoading ? (
            <SkeletonProvider>
            <Skeleton height={30}/>
            <Skeleton height={30}/>
            <Skeleton height={30}/>
            </SkeletonProvider>
          ) : activeSessionError ? (
                        <Text fontSize={'$4'} fontWeight={'$semiBold'} textTransform="uppercase" color={'$red10'}>Error</Text>
            <XCircle color={'$red10'}/>
            <Text fontSize={'$2'} color={'$white6'}>{activeSessionError?activeSessionError?.message:'Fetching failed, please try again later'}</Text>
          ) : activeSessionTest?.length !== 0 ? (
            <View></View>
          ) : (
                        <Text fontSize={'$4'} fontWeight={'$semiBold'} textTransform="uppercase" color={'$white'}>Empty</Text>
            <BookX color={'$white'}/>
            <Text fontSize={'$2'} color={'$white6'}>You dont have any active session, Go take a lesson</Text>
            <Button icon={Book} onPress={()=>router.navigate("/lesson")}>Lesson</Button>
          )} */}
                    </YStack>
        <YStack gap={16}>
          <Text
            borderLeftWidth={3}
            borderLeftColor={"$accent11"}
            paddingLeft={12}
          >
            Statistic
          </Text>
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
