import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnswerChoicesTestType,TipTapNode } from "../../../types/Test";
import { apiClient } from "../../../lib/apiClient";
import { authClient } from "../../../lib/authClients";
import { useRouter } from "expo-router";
import { Text, useToastController, View } from "tamagui";
import { ScrollView } from "tamagui";
import { renderNode } from "../../../utils/renderNode";

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
  savedAnswer,
  handleOrder,
  lastQuestion,
  param: { type, testId },
}: {
  question: OptimisticUI;
  handleOrder: (num: number) => void;
  savedAnswer: string | undefined;
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
    }: {
      testId: string;
      questionId: string;
      choiceId: string;
    }) => {
      const res = await apiClient.patch(
        `/api/test-attempt/answer-question/${testId}`,
        { headers: { Cookie: userCookie } },
      );
      return res.data;
    },
    onMutate: async ({ questionId, choiceId }) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<OptimisticUI[]>(key);
      queryClient.setQueryData<OptimisticUI[]>(key, (old = []) =>
        old.map((q) =>
          q._id === questionId ? { ...q, selectedChoiceId: choiceId } : q,
        ),
      );
      return { previous };
    },
    onSuccess: () => {
      if (lastQuestion) return;
      handleOrder(question.order + 1);
    },
    onError: (err: any, _vars, ctx) => {
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
  const submitMutate=useMutation({
    mutationKey:['submit-test',testId],
    mutationFn:async ({testId}:{testId:string})=>{const res=await apiClient(`/api/test-attempt/test/${testId}/submit`,{headers:{Cookie:userCookie}});return res.data},
    onSuccess:(res)=>{toastController.show(res.message,{customData:{type:'success'}});setTimeout(()=>router.navigate('/client/dashboard/home'),3000)}
  })
  return (
    <ScrollView>
        <Text>{question.qTitle}</Text>
        <Text>{question._id}</Text>
        <View>{renderNode(question.qDescription,question.order)}</View>
    </ScrollView>
  )
}
