import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import Drawer from "expo-router/drawer";
import { useEffect } from "react";
import { Button, Text, useToastController, View, YStack } from "tamagui";
import { apiClient } from "../../../../../lib/apiClient";
import { authClient } from "../../../../../lib/authClients";
import { TypeTest } from "../../../../../types/Test";

export default function ConfirmationTestPage() {
  const param = useLocalSearchParams<{
    testId: string;
    type: TypeTest;
  }>();
  const router = useRouter();
  const toast = useToastController();
  const userCookie = authClient.getCookie();
  const queryClient=useQueryClient()
  const { data: isSessionActive } = useQuery<{
    success: boolean;
    message: string;
    data:
      | { testId: string; userId: string; expiresAt: string }
      | "no session"
      | null;
  }>({
    queryKey: ["voucher-validation", "test-session", param.type, param.testId],
    queryFn: async () => {
      const res = await apiClient.get(
        `/api/voucher/${param.type}/metadata/${param.testId}/active-session`,
      );
      return res.data;
    },
  });
  const testMutate = useMutation({
    mutationKey: ["check-session", param.testId],
    mutationFn: async ({ testId }: { testId: string }) => {
      const res = await apiClient.post(
        `/api/test-attempt/test/${testId}/attempts`,
        {},
        { headers: { Cookie: userCookie } },
      );
      return res;
    },
    onError: (err) => {
      console.log(err);
      toast.show(err.message, { message: err.name });
      return
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['all-active-session']})
      router.navigate({pathname:`/client/test/session/[type]/[testId]`,params:{type:param.type,testId:param.testId}});
    },
  });
  useEffect(() => console.log(param.testId, param.type), [param]);
  useEffect(() => console.log(isSessionActive), [isSessionActive]);
  const handleStartTest = (testId: string) => {
    if (!param.testId) return console.log("no testid");
    testMutate.mutate({ testId });
  };
  return (
    <>
      <View flex={1} justifyContent="center" alignItems={"center"}>
        <YStack
          gap={8}
          padding={12}
          borderRadius={10}
          borderWidth={1}
          borderColor={"$borderColor"}
        >
          <Text fontSize={"$4"}>{"Start Test"}</Text>
          {isSessionActive && typeof isSessionActive?.data === "string" ? (
            <Button
              onPress={() =>
                router.push({
                  pathname: "/client/test/session/[type]/[testId]",
                  params: { type: param.type, testId: param.testId },
                })
              }
            >
              Continue Test
            </Button>
          ) : (
            <Button onPress={() => handleStartTest(param.testId)}>Start</Button>
          )}
        </YStack>
      </View>
    </>
  );
}
