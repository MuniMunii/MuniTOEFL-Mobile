import { Text, Button, YStack, XStack, ScrollView } from "tamagui";
import { authClient } from "../../../../lib/authClients";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GraphProgress from "../../../../components/card/client/graphProgress";
import { Book, BookX, Pen, XCircle } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import EditUsername from "../../../../components/sheet/editUsername";
import { useQuery } from "@tanstack/react-query";
import { SkeletonProvider, Skeleton } from "../../../../components/skeleton";
import { useRouter } from "expo-router";
import ActivatedVoucher from "../../../../components/card/client/activatedVoucher";
import { TypeTest } from "../../../../types/Test";
import { apiClient } from "../../../../lib/apiClient";
import { View } from "tamagui";
interface ActiveSessionProps {
  title: string;
  titleSug: string;
  status: "in_progress" | "expired" | "submitted";
  type: TypeTest;
  testId: string;
  _id: string;
}
interface ResultsCollectionProps {
  _id: string;
  status: "in_progress" | "expired" | "submitted";
  userId: string;
  testId: string;
  submittedAt: Date;
  expiredAt: Date;
  expiresAt: Date;
}
export default function ClientDashboard() {
  const { data: session } = authClient.useSession.get();
    const [pageHistory,setPageHistory]=useState<number>(1)
const [attemptHistoryState,setAttemptHistory]=useState<ResultsCollectionProps[]>([])

  const router = useRouter();
  const cookies = authClient.getCookie();
  const [openEditUsername, setOpenEditUsername] = useState<boolean>(false);
  //   for optimistic update after update
  const [username, setUsername] = useState(session?.user.name ?? "User");
  const inset = useSafeAreaInsets();
  const userCookie = authClient.getCookie();
  const {
    data: activeSessionTest,
    error: activeSessionError,
    isLoading: activeSessionLoading,
  } = useQuery({
    queryKey: ["all-active-session"],
    queryFn: async () => {
      try {
        const res = await apiClient.get(
          "/api/test-attempt/test/active-session",
          { headers: { Cookie: userCookie } },
        );
        return res.data.data as ActiveSessionProps[];
      } catch (err: any) {
        console.log(err.response.data);
        if (err.response.statusCode === 204) {
          return console.log("not found");
        }
      }
    },
  });
  // Bug page query is not working and duplicating the previous data
  const {
    data: historyAttempt,
    isError,
    error,
  } = useQuery<ResultsCollectionProps[]>({
    queryKey: ["history-attempt-test"],
    queryFn: async () => {
      const res = await apiClient.get(`/api/test-attempt/results?page=${pageHistory}`, {
        headers: { Cookie: userCookie },
      });
      return res.data.data as ResultsCollectionProps[];
    },
  });
  // Debugging
  useEffect(() => {
    console.log(activeSessionTest);
  }, [activeSessionTest]);
useEffect(() => {
  if (!historyAttempt) return;
  
  if (pageHistory === 1) {
    // If it's the first pageHistory (or a fresh reload), just overwrite the list
    setAttemptHistory(historyAttempt);
  } else {
    // If it's pageHistory 2+, append it to the bottom
    setAttemptHistory((prev) => [...prev, ...historyAttempt]);
  }
  console.log(pageHistory)
}, [historyAttempt, pageHistory]);
  return (
    <>
      <EditUsername
        open={openEditUsername}
        setOpen={setOpenEditUsername}
        setUsername={setUsername}
      />
      <ScrollView
        flex={1}
        backgroundColor={"black"}
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
          ) : Array.isArray(activeSessionTest) ? (
            activeSessionTest?.map((test) => {
              return (
                <XStack
                  key={test._id}
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
                  <Button
                    onPress={() =>
                      router.navigate({
                        pathname: `/client/test/session/[type]/[testId]`,
                        params: { type: test.type, testId: test.testId },
                      })
                    }
                  >
                    Continue
                  </Button>
                </XStack>
              );
            })
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
              <Button
                icon={Book}
                onPress={() =>
                  router.navigate({
                    pathname: "/lesson",
                    params: { type: "writing" },
                  })
                }
              >
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
            <GraphProgress x={10} y={20} limit={20} type="writing" />
            <GraphProgress x={10} y={20} limit={20} type="reading" />
          </XStack>
          <XStack gap={16}>
            <GraphProgress x={10} y={20} limit={20} type="speaking" />
            <GraphProgress x={10} y={20} limit={20} type="listening" />
          </XStack>
        </YStack>
        <ActivatedVoucher />
        <View>
          <Button onPress={()=>setPageHistory((prev)=>prev+1)}>page</Button>
          {Array.isArray(attemptHistoryState)&&attemptHistoryState.map((attempt, i) => (
            <Button
              key={attempt._id+i}
              onPress={() =>
                router.push({
                  pathname: "/client/test/result/[attemptId]",
                  params: { attemptId: attempt._id },
                })
              }
            >
              {attempt._id + attempt.status}
            </Button>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
