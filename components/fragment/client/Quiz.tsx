import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnswerChoicesTestType, TipTapNode } from "../../../types/Test";
import { apiClient } from "../../../lib/apiClient";
import { authClient } from "../../../lib/authClients";
import { useRouter } from "expo-router";
import { Text, useToastController, YStack, Button } from "tamagui";
import { ScrollView } from "tamagui";
import { renderNode } from "../../../utils/renderNode";
import { useEffect } from "react";
import { View as RNView } from "react-native";
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
function isJSONContent(value: unknown): value is TipTapNode {
  return typeof value === "object" && value !== null && "type" in value;
}
// addmin more props for cache selected choice UI
type OptimisticUI = AnswerChoicesTestType & {
  selectedChoiceId: string | null;
  _id: string | null;
};
// for type context
type OptimisticContext = { previous?: OptimisticUI[] };
export default function Quiz({
  question,
  // savedAnswer,
  handleOrder,
  lastQuestion,
  param: { type, testId },
}: {
  question: OptimisticUI;
  handleOrder: (num: number) => void;
  // savedAnswer: string | undefined;
  lastQuestion: boolean;
  param: { type: string | undefined; testId: string | undefined };
}) {
  const queryClient = useQueryClient();
  const userCookie = authClient.getCookie();
  const key = ["test-session", type, testId];
  const router = useRouter();
  const toastController = useToastController();
  const answerMutate = useMutation({
    mutationKey: ["patch-answer", type, testId],
    mutationFn: async ({
      testId,
      questionId,
      choiceId,
      saved,
    }: {
      testId: string | undefined;
      questionId: string;
      choiceId: string;
      saved: boolean;
    }) => {
      const res = await apiClient.patch(
        `/api/test-attempt/answer-question/${testId}`,
        { questionId, choiceId, saved: true },
        { headers: { Cookie: userCookie } },
      );
      return res.data;
    },
    onMutate: async ({ questionId, choiceId }) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<{
        question: OptimisticUI[];
        savedAnswer: SavedAnswerType;
      }>(key);
      queryClient.setQueryData<{
        question: OptimisticUI[];
        savedAnswer: SavedAnswerType;
      }>(key, (old: any) => {
        if (!old) return;
        return {
          ...old,
          question: old.question.map((q: OptimisticUI) =>
            q._id === question._id ? { ...q, selectedChoiceId: choiceId } : q,
          ),
        };
      });
      return { previous };
    },
    onSuccess: () => {
      if (lastQuestion) return;
      handleOrder(question.order + 1);
    },
    onError: (err: any, _vars, ctx) => {
      // console.log("error hit");
      // console.log(JSON.stringify(err.response, null, 2));
      if (err.response.status === 403) {
        queryClient.removeQueries({ queryKey: key });
        router.navigate({
          pathname: `/take-test/[type]/[testId]`,
          params: { type: type, testId: testId },
        });
      } else {
        queryClient.setQueryData(key, ctx?.previous);
      }
      toastController.show(err.response.data.message, {
        customData: { type: "error" },
      });
    },
  });

  // useEffect(()=>console.log(savedAnswer),[savedAnswer])
  // useEffect(()=>console.log(question.selectedChoiceId))
  return (
    <ScrollView>
      <Text>{question.qTitle}</Text>
      <Text>{question._id}</Text>
      <RNView>{renderNode(question.qDescription, question.order)}</RNView>
      <YStack gap={10}>
        {question.choices.map((val, i) => {
          const isSaved = question.selectedChoiceId === val.choiceId;
          return (
            <Button
              onPress={() =>
                answerMutate.mutate({
                  choiceId: val.choiceId,
                  questionId: question._id,
                  testId,
                  saved: val.saved,
                })
              }
              key={val.choiceId}
              style={{ borderColor: isSaved ? "red" : "ButtonBorder" }}
            >
              {val.cTitle}
              {isSaved ? "Yes" : "NO"}
            </Button>
          );
        })}
      </YStack>
    </ScrollView>
  );
}
