import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, Button } from "tamagui";
import { useState } from "react";
import { authClient } from "../../lib/authClients";
import { Menu } from "@tamagui/lucide-icons";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
export default function HeaderClient() {
  const { data: session } = authClient.useSession.get();
  const inset = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigation();
  return (
    <>
      <View
        mt={inset.top}
        width={"100%"}
        height={70}
        backgroundColor={"$background"}
        p={12}
        flexDirection="row"
      >
        <Button
          icon={Menu}
          backgroundColor={"$colorTransparent"}
          p={0}
          pressStyle={{ border: "none", backgroundColor: "$colorTransparent" }}
          onPress={() => {
            navigate.dispatch(DrawerActions.openDrawer());
          }}
        />
      </View>
    </>
  );
}
