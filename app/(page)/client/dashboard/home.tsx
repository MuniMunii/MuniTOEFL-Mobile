import {
  Text,
  Button,
  YStack,
  XStack,
  ScrollView,
  View,
  Input,
  useToastController,
} from "tamagui";
import { authClient } from "../../../../lib/authClients";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GraphProgress from "../../../../components/card/client/graphProgress";
import { Book, BookX, Pen, XCircle } from "@tamagui/lucide-icons";
import {  useState } from "react";
import EditUsername from "../../../../components/sheet/editUsername";
import { useQuery } from "@tanstack/react-query";
import { SkeletonProvider, Skeleton } from "../../../../components/skeleton";
import { useRouter } from "expo-router";
import queryFn, { DataProps } from "../../../../utils/queryFn";
import ActivatedVoucher from "../../../../components/card/client/activatedVoucher";
interface ActiveSessionProps {
  title: string;
  titleSug: string;
  type: "in_progress" | "expired" | "submitted";
}
export default function ClientDashboard() {

  const { data: session } = authClient.useSession.get();
  const router = useRouter();
  const cookies = authClient.getCookie();
  const [openEditUsername, setOpenEditUsername] = useState<boolean>(false);
  //   for optimistic update after update
  const [username, setUsername] = useState(session?.user.name ?? "User");
  const inset = useSafeAreaInsets();
  const {
    data: activeSessionTest,
    error: activeSessionError,
    isLoading: activeSessionLoading,
  } = useQuery<DataProps<ActiveSessionProps[]>>({
    queryKey: ["all-active-session"],
    queryFn: () =>
      queryFn<ActiveSessionProps[]>(
        "/api/test-attempt/tests/active-session",
        true,
      ),
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
          gap: 12,
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
            paddingLeft={12}
          >
            Active Session
          </Text>
        </YStack>
        <YStack
          gap={10}
          p={24}
          alignItems="center"
          justifyContent="center"
          backgroundColor={"$background"}
          width={"95%"}
          alignSelf="center"
          borderRadius={14}
        >
          {activeSessionLoading ? (
            <SkeletonProvider>
              <Skeleton height={30} />
              <Skeleton height={30} />
              <Skeleton height={30} />
            </SkeletonProvider>
          ) : activeSessionError ? (
            <YStack alignItems="center" gap={8}>
              <Text
                fontSize="$4"
                fontWeight="$semiBold"
                textTransform="uppercase"
                color="$red10"
              >
                Error
              </Text>

              <XCircle color="$red10" />

              <Text fontSize="$2" color="$white6">
                {activeSessionError?.message ??
                  "Fetching failed, please try again later"}
              </Text>
            </YStack>
          ) : activeSessionTest?.data.length !== 0 ? (
            <XStack
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              p={8}
              backgroundColor="$accent9"
              borderRadius={10}
            >
              <YStack gap={4} flex={1} flexShrink={1}>
                <Text>Listening</Text>
                <Text fontSize="$1" color="$white3">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ipsum, id!
                </Text>
              </YStack>

              <Button onPress={() => console.log(cookies)}>Continue</Button>
            </XStack>
          ) : (
            <YStack alignItems="center" gap={8}>
              <Text
                fontSize="$4"
                fontWeight="$semiBold"
                textTransform="uppercase"
                color="$white"
              >
                Empty
              </Text>

              <BookX color="$white" />

              <Text fontSize="$2" color="$white6">
                You dont have any active session, Go take a lesson
              </Text>

              <Button icon={Book} onPress={() => router.navigate("/lesson")}>
                Lesson
              </Button>
            </YStack>
          )}
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
        <ActivatedVoucher/>
      </ScrollView>
    </>
  );
}
