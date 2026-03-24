import {YStack,Text,Button} from "tamagui"
import { Link, Stack } from 'expo-router';
export default function NotFoundScreen(){
    return (
        <>
        <Stack.Screen options={{ title: 'Oops! Not Found' }} />
        <YStack flex={1}>
            <Text>Page Not found</Text>
            <Link href={'/'}>Go Back to home screen!</Link>
        </YStack>
        </>
    )
}