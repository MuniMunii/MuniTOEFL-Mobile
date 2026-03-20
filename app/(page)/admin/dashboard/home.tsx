import { Text, View,Menu, Button } from "tamagui";
import { authClient } from "../../../../lib/authClients";
import SignoutButton from "../../../../components/button/signout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function ClientDashboard(){
     const {data:session}= authClient.useSession.get()
     const inset=useSafeAreaInsets()
    return (
        <View pt={inset.top}>
            <SignoutButton/>
            <Text>{session?.user.name?session?.user.name:'No session'}</Text>
            <Text>Admin Dashboard</Text>
        </View>
    )
}