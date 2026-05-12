import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Button, ScrollView, Text,XStack } from "tamagui";
import { apiClient } from "../../../../../../lib/apiClient";
import { authClient } from "../../../../../../lib/authClients";
import { AnswerChoicesTestType, QuestionType, TypeTest } from "../../../../../../types/Test";
import { useToastController } from "tamagui";
import Quiz from "../../../../../../components/fragment/client/Quiz";
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
  expiresAt:string
}
export default function TestSessionPage() {
  const param = useLocalSearchParams<{ testId: string,type:TypeTest }>();
  const [order, setOrder] = useState<number>(1);
  const userCookie = authClient.getCookie();
  const toastController=useToastController();
  const router=useRouter()
  const { data: test,error,isLoading } = useQuery({
    queryKey: ["test-session", param.type,param.testId],
    enabled: !!param.testId,
    queryFn: async () => {try{
      console.log("QUERY RUNNING with:", param.testId);
      const res = await apiClient.get(
        `/api/test-attempt/test/${param.testId}/questions?type=${param.type}`,
        { headers: { Cookie: userCookie } },
      );
      console.log(res.data.data);
      return res.data.data as OptimisticUI[];}catch(err:any){console.log(err.response?.data);toastController.show(err.response.data.message,{customData:{type:'error'}});throw err}
    },
  });
   const { data: savedAnswer } = useQuery({
    queryKey: ["saved-answer", param.type, param.testId],
    queryFn: async () => {
      const res = await apiClient.get(
        `/api/test-attempt/tests/${param.testId}/active-session`,
        {headers:{Cookie:userCookie}}
      );
      return res.data.data as SavedAnswerType;
    },
  });
  useEffect(() => console.log(param), [param]);
  useEffect(() => {console.log(test,'error: ',error)}, [test,error]);
  useEffect(()=>console.log(JSON.stringify(savedAnswer,null,2)),[savedAnswer])
  const quizOrder=useMemo(()=>{return test?.find(v=>v.order===order)},[test,order])
  const lastQuestion=quizOrder?.order===test?.length
const savedAnswerOrder = useMemo(() => {
    if (!savedAnswer) return;
    return savedAnswer.answers.find((c) =>
      quizOrder?.choices.some((qC) => qC.choiceId === c.choiceId),
    );
  }, [quizOrder, savedAnswer]);
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
    <Quiz handleOrder={handleOrder} lastQuestion={lastQuestion} question={quizOrder} savedAnswer={savedAnswerOrder?.choiceId} param={{testId:param.testId,type:param.type}}/>
      <XStack gap={2} flexWrap="wrap" width={'90%'} mt={12}>
      {test?.map((v)=>{return <Button key={v._id} onPress={()=>handleOrder(v.order)}>{`${v.order}`}</Button>})}
      </XStack>
    </ScrollView>
  );
}
