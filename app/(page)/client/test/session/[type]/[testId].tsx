import { useLocalSearchParams } from "expo-router"
import { useEffect } from "react";
import { Text } from "tamagui";

export default function TestSessionPage(){
    const param=useLocalSearchParams<{testId:string}>();
    useEffect(()=>console.log(param.testId),[param])
    return <Text>{param.testId}</Text>
}