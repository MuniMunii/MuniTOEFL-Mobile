import { useNavigation, useRouter } from "expo-router";
import { Button } from "tamagui";
import { authClient } from "../../lib/authClients";
import { DrawerActions } from "@react-navigation/native";

export default function SignoutButton({
  transparent = false,
  fromDrawer = false,
  closeDrawer
}: {
  closeDrawer:(url:string)=>void
  transparent?: boolean;
  fromDrawer?: boolean;
}) {
  const router = useRouter();
  const navigation = useNavigation();
  const handleSignout = async () => {
    const signOutClient = await authClient.signOut();
    if (signOutClient.error) {
      console.log(signOutClient.error);
    }
    console.log(signOutClient);
    closeDrawer("/");
  };
  return (
    <Button
      backgroundColor={transparent ? "$colorTransparent" : "$borderColor"}
      onPress={handleSignout}
    >
      Logout
    </Button>
  );
}
