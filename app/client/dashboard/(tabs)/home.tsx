import { Text, View } from "tamagui";
import { authClient } from "../../../lib/authClients";
import SignoutButton from "../../../components/button/signout";

export default function ClientDashboard(){
     const {data:session}= authClient.useSession.get()
    return (
        <View>
            <SignoutButton/>
            <Text>{session?.user.name?session?.user.name:'No session'}</Text>
            <Text>Client Dashboard</Text>
        </View>
    )
}