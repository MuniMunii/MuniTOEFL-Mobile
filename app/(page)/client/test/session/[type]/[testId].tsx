import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Button, ScrollView, Text, XStack } from "tamagui";
import { apiClient } from "../../../../../../lib/apiClient";
import { authClient } from "../../../../../../lib/authClients";
import {
  AnswerChoicesTestType,
  QuestionType,
  TypeTest,
} from "../../../../../../types/Test";
import { useToastController } from "tamagui";
import Quiz from "../../../../../../components/fragment/client/Quiz";
import { isAxiosError } from "axios";
type OptimisticUI = AnswerChoicesTestType & {
  selectedChoiceId: string | null;
  _id: string | null;
};
interface SavedAnswerType {
  testId: string;
  userId: string;
  status: "expired" | "in_progress" | "submitted";
  answers: {
    questionId: string;
    choiceId: string;
    saved: boolean;
  }[];
  expiresAt: string;
}
export default function TestSessionPage() {
  const param = useLocalSearchParams<{ testId: string; type: TypeTest }>();
  const [order, setOrder] = useState<number>(1);
  const userCookie = authClient.getCookie();
  const toastController = useToastController();
  const router = useRouter();
  const queryClient=useQueryClient()
  const {
    data: Question,
    isLoading,
    isError,
    error,
  } = useQuery<{
    question: OptimisticUI[];
    savedAnswer: SavedAnswerType;
  }>({
    queryKey: ["test-session", param.type, param.testId],
    queryFn: async () => {
      const [question, savedAnswer] = await Promise.all([
        apiClient.get(
          `/api/test-attempt/test/${param.testId}/questions?type=${param.type}`,
          { headers: { Cookie: userCookie } },
        ),
        apiClient.get(
          `/api/test-attempt/test/${param.testId}/active-session`,
          { headers: { Cookie: userCookie } },
        ),
      ]);
      const rawQuestion = question.data.data;
      const rawSavedAnswer: SavedAnswerType = savedAnswer.data.data;
      const mergedQuestion = rawQuestion.map((q: OptimisticUI) => {
        const previouslySavedAnswer = rawSavedAnswer.answers.find(
          (value) =>
            value.questionId === q._id && value.choiceId && value.saved,
        )?.choiceId;
        return {
          ...q,
          selectedChoiceId: q.selectedChoiceId || previouslySavedAnswer || null,
        };
      });
      // console.log('this is Merged:',JSON.stringify(mergedQuestion,null,2))
      return { question: mergedQuestion, savedAnswer: rawSavedAnswer };
    },
  });
    const submitMutate = useMutation({
      mutationKey: ["submit-test", param.testId],
      mutationFn: async ({ testId }: { testId: string }) => {
        const res = await apiClient.post(`/api/test-attempt/test/${testId}/submit`,{testId}, {
          headers: { Cookie: userCookie },
        });
        return res.data;
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries({queryKey: ["all-active-session"]})
        toastController.show(res.message, { customData: { type: "success" } });
        router.navigate("/client/dashboard/home")
      },
    });
    function handleSubmit(){
      if(Question?.question.some((q)=>q.selectedChoiceId===null)){
        return toastController.show('Theres still unaswered questions',{customData:{type:error}})
      }
      submitMutate.mutate({testId:param.testId})
    }
  useEffect(() => {
    if (isError && error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 403) {
          toastController.show("Forbidden", {
            message: error.response?.data.message ?? "Test Invalid",
            customData: { type: "error" },
          });
          router.navigate("/client/dashboard/home");
        }
        if (status === 401) {
          toastController.show("Unauthorized", {
            message: error.response?.data.message,
            customData: { type: "error" },
          });
          router.navigate("/client/dashboard/home");
        }
        if (status === 400) {
          toastController.show("Bad Request", {
            message:
              error.response?.data.message ?? "Bad Request/Invalid TestId",
            customData: { type: "error" },
          });
          router.navigate("/client/dashboard/home");
        }
      }
    }
  }, [isError, error]);
  const quizOrder = useMemo(() => {
    return Question?.question?.find((v) => v.order === order);
  }, [Question?.question, order]);
  const lastQuestion = quizOrder?.order === Question?.question?.length;
  function handleOrder(num: number) {
    setOrder(num);
  }
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!quizOrder) {
    return null; // or loading / fallback UI
  }
  return (
    <ScrollView backgroundColor={"black"}>
      <Text>Testing</Text>
      <Quiz
        handleOrder={handleOrder}
        lastQuestion={lastQuestion}
        question={quizOrder}
        param={{ testId: param.testId, type: param.type }}
      />
      {lastQuestion&&<Button onPress={handleSubmit} mt={12}>Submit Test</Button>}
      <XStack gap={2} flexWrap="wrap" width={"90%"} mt={12}>
        {Question?.question?.map((v) => {
          return (
            <Button
              key={v._id}
              onPress={() => handleOrder(v.order)}
            >{`${v.order}`}</Button>
          );
        })}
      </XStack>
    </ScrollView>
  );
}
