import { Text, View } from "tamagui";
import { authClient } from "../../lib/authClients";

export default function ClientDashboard(){
     const {data:session}= authClient.useSession.get()
    return (
        <View>
            <Text>{session?.user.name}</Text>
            <Text>Client Dashboard</Text>
        </View>
    )
}